import { fileURLToPath } from "url";
import axios from "axios";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();
const URL = process.env.BASE_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory structure
const dataDir = path.join(__dirname, "../data");
const addressesFilePath = path.join(dataDir, "addresses.json");
const allAddressesFilePath = path.join(dataDir, "allAddresses.json");
const lastNFilePath = path.join(dataDir, "lastN.js");

const filePaths = {
  lastNFilePath: path.join(dataDir, "lastN.js"),
  addressesFilePath: path.join(dataDir, "addresses.json"),
  allAddressesFilePath: path.join(dataDir, "allAddresses.json"),
};

getAddresses();

async function getAddresses() {
  try {
    let lastN;

    if (fs.existsSync(lastNFilePath)) {
      const content = fs.readFileSync(lastNFilePath, "utf-8").trim();
      lastN = content ? parseInt(content, 10) : 0;
    } else {
      for (const filePathKey in filePaths) {
        const filePath = filePaths[filePathKey];
        if (!fs.existsSync(filePath)) {
          const directory = path.dirname(filePath);
          if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
          }
          fs.writeFileSync(filePath, "", "utf-8");
        }
      }
      fs.writeFileSync(lastNFilePath, "0", "utf-8");
      lastN = 0;
    }

    const blockHeightResponse = await axios.get(`${URL}blocks/height`);
    const blockHeight = Number(blockHeightResponse.data.height);

    console.log(`blockheight = ${blockHeight}`);

    //To hold a list of transactions
    let addresses = [];

    if (blockHeight) {
      console.log("Sequencing the Blocks");

      for (let n = lastN; n <= blockHeight; n += 10) {
        // Tranverse 10 blocks per time
        const response = await axios.get(`${URL}blocks/seq/${n}/${n + 10}`);

        // const response = await axios.get(
        //   `http://178.62.234.225/blocks/at/${n}`
        // );

        const blockData = response.data;

        //Returns just the addresses of either sender or receiver
        const extractedAddresses = blockData.flatMap((obj) =>
          obj.transactions.map((transaction) => {
            const sender = transaction.sender;
            const recipient = transaction.recipient;

            //if recipient exists and is not an empty string
            if (recipient !== undefined && recipient.trim() !== "") {
              return [sender, recipient];
            } else {
              // If recipient does not exist
              return [sender];
            }
          })
        );

        addresses = addresses.concat(extractedAddresses).flat(1);
        console.log(addresses);

        //write out the current value of n
        fs.writeFileSync(lastNFilePath, n.toString(), "utf-8");

        //Write out the addresses
        handleWrite(addresses);

        console.log(`N = ${n}`);
      }
    }

    console.log("Transactions fetched and stored successfully.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function handleWrite(addresses) {
  try {
    // Read the contents of the addresses file
    let addressesContent = fs.readFileSync(addressesFilePath, "utf-8");

    // Check if the file is empty or does not contain valid JSON data
    let addressesArray = [];
    if (addressesContent.trim()) {
      addressesArray = JSON.parse(addressesContent);
    }

    // Flatten the addresses array and remove duplicates
    let flattenedArray = addressesArray.flat(1);
    flattenedArray = [...new Set(flattenedArray)];

    // Filter out addresses that are already present in the addresses file
    const newAddresses = addresses.filter(
      (address) => !flattenedArray.includes(address)
    );

    // Filter out null values from the newAddresses array
    const filteredAddresses = newAddresses.filter(
      (address) => address !== null
    );

    // If there are new non-null addresses, append them to the addresses file
    if (filteredAddresses.length > 0) {
      addressesArray = addressesArray.concat(filteredAddresses);
      fs.writeFileSync(
        addressesFilePath,
        JSON.stringify(addressesArray, null, 2),
        "utf-8"
      );

      // Read the contents of the allAddresses file
      let allAddressesContent = fs.readFileSync(allAddressesFilePath, "utf-8");
      let allAddressesArray = [];
      if (allAddressesContent.trim()) {
        allAddressesArray = JSON.parse(allAddressesContent);
      }

      // Collapse all arrays in allAddresses into one array
      let collapsedArray = allAddressesArray.flat();

      // Concatenate the new non-null addresses with the collapsed array
      collapsedArray = collapsedArray.concat(filteredAddresses);

      // Remove duplicates from the collapsed array
      collapsedArray = [...new Set(collapsedArray)];

      // Write the collapsed array back to the allAddresses file
      fs.writeFileSync(
        allAddressesFilePath,
        JSON.stringify(collapsedArray, null, 2),
        "utf-8"
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
