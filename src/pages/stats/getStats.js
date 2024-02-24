import axios from "axios";
import { BASE_URL } from "../../utils/config";

export async function getStats(type) {
  try {
    const currentDate = new Date();
    const from = new Date(currentDate);
    from.setMonth(from.getMonth() - 3); // Set from date to 3 months ago
    const to = new Date(); // Current date
    const interval = 50; // Interval of 50 days

    let txBodies = [];
    let currentDateCursor = new Date(from);

    while (currentDateCursor < to) {
      const nextIntervalDate = new Date(currentDateCursor);
      nextIntervalDate.setDate(nextIntervalDate.getDate() + interval);
      const toDate = nextIntervalDate > to ? to : nextIntervalDate;

      const fromDateStr = currentDateCursor.toISOString().split("T")[0];
      const toDateStr = toDate.toISOString().split("T")[0];

      const response = await axios.get(
        `${BASE_URL}index/stats/transactions/${type}/${fromDateStr}/${toDateStr}`
      );

      txBodies.push(response.data);
      currentDateCursor = nextIntervalDate;
    }
    txBodies = txBodies.flat();
    //txBodies = txBodies.reverse();
    let output = txBodies;
    return output;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
