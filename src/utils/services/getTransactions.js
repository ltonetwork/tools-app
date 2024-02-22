import axios from "axios";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();
const URL = process.env.BASE_URL;

const TYPES = [
  "transfer",
  "lease",
  "mass_transfer",
  "all_transfers",
  "data",
  "anchor",
  "association",
  "burn",
];

async function getTxs() {
  try {
    console.log(URL);
    const from = new Date("2019-01-12");
    const to = new Date(); // Current date

    const interval = 50; // Interval of 50 days

    let currentDate = new Date(from);

    while (currentDate < to) {
      const nextIntervalDate = new Date(currentDate);
      nextIntervalDate.setDate(nextIntervalDate.getDate() + interval);

      if (nextIntervalDate > to) {
        nextIntervalDate = to;
      }

      const fromDateStr = currentDate.toISOString().split("T")[0];
      const toDateStr = nextIntervalDate.toISOString().split("T")[0];

      const responses = [];

      for (const type of TYPES) {
        const response = await axios
          .get(
            `${URL}index/stats/transactions/${type}/${fromDateStr}/${toDateStr}`
          )
          .then((res) => {
            return res.data;
          });
        responses.push(response);
      }

      // Do something with responses for this interval
      console.log(
        `Data for interval ${fromDateStr} to ${toDateStr}:`,
        responses
      );

      currentDate = nextIntervalDate;
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

getTxs();
