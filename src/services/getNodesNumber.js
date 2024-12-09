import axios from "axios";
import { EXT_URL2 } from "./config";

export async function getNodeNumber() {
  try {
    const peersResponse = await axios.get(`${EXT_URL2}/nodes/json`);
    const peersData = peersResponse.data;
    const numberOfNodes = peersData.length;

    return numberOfNodes;
  } catch (error) {
    console.error(error);
  }
}
