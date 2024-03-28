import React, { useEffect, useState } from "react";
import axios from "axios";
import { SCRIPT, EXT_URL2 } from "./config";

export async function getApy() {
  try {
    const gen = await axios
      .get(`${EXT_URL2}generators-weekly/json`)
      .then((res) => {
        return res.data;
      });
    //console.log(gen);

    const totalBalance = gen.reduce((total, datum) => {
      return total + datum.balance;
    }, 0);
    //console.log("generating bal: ", totalBalance);

    const response = await axios.get(`${SCRIPT}/blocks-weekly`);
    const totalReward = response.data.reduce((total, datum) => {
      return total + datum.generatorReward;
    }, 0);

    const reward = totalReward / 100000000;

    //console.log("total gen. rewards: ", reward);
    const APY = (reward / totalBalance) * 100 * 52;
    //console.log("APY: ", (reward / totalBalance) * 100 * 52);
    return APY;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchData() {
  try {
    const data = await getApy();
    // Do something with the data here
  } catch (error) {
    // Handle error if necessary
  }
}

// Call the fetchData function
fetchData();
