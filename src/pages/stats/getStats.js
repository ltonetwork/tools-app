import axios from "axios";
import { BASE_URL } from "../../services/config";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

async function fetchData(type, from, to) {
  const interval = 50;
  const txBodies = [];
  let currentDateCursor = new Date(from);

  while (currentDateCursor < to) {
    const nextIntervalDate = new Date(currentDateCursor);
    nextIntervalDate.setDate(nextIntervalDate.getDate() + interval);
    const toDate = nextIntervalDate > to ? to : nextIntervalDate;

    const fromDateStr = currentDateCursor.toISOString().split("T")[0];
    const toDateStr = toDate.toISOString().split("T")[0];

    const url =
      type === "operations"
        ? `${BASE_URL}index/stats/${type}/${fromDateStr}/${toDateStr}`
        : `${BASE_URL}index/stats/transactions/${type}/${fromDateStr}/${toDateStr}`;

    const response = await axios.get(url);
    txBodies.push(response.data);
    currentDateCursor = nextIntervalDate;
  }
  return txBodies.flat();
}

export async function getStats(type) {
  try {
    const currentDate = new Date();
    const from = new Date(currentDate);
    from.setMonth(from.getMonth() - 3);
    const to = new Date();
    const txBodies = await fetchData(type, from, to);
    const formattedData = txBodies.map(({ period, ...rest }) => {
      const [datePart] = period.split(" ");
      const [, month, day] = datePart.split("-");
      return {
        period: `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`,
        ...rest,
      };
    });
    return formattedData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getOperations() {
  try {
    const currentDate = new Date();
    const from = new Date(currentDate);
    from.setMonth(from.getMonth() - 3);
    const to = new Date();
    const txBodies = await fetchData("operations", from, to);
    const formattedData = txBodies.map(({ period, ...rest }) => {
      const [datePart] = period.split(" ");
      const [, month, day] = datePart.split("-");
      return {
        period: `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`,
        ...rest,
      };
    });
    return formattedData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getOperationsWeek() {
  try {
    const currentDate = new Date();
    const weeksAgo = new Date(currentDate);
    weeksAgo.setDate(weeksAgo.getDate() - 7);
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    let txBodies = await fetchData("operations", threeMonthsAgo, currentDate);

    txBodies = txBodies.filter((data) => new Date(data.period) >= weeksAgo);

    const formattedData = txBodies.map(({ period, ...rest }) => {
      const [datePart] = period.split(" ");
      const [, month, day] = datePart.split("-");
      return {
        period: `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`,
        ...rest,
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
