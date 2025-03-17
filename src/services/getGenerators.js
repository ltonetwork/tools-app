import axios from "axios";
import { SCRIPT } from "./config";

export async function getGenerators() {
  try {
    const generators = await axios.get(`${SCRIPT}/tools/generators`);
    return generators.data;
  } catch (error) {
    console.error(error);
  }
}
