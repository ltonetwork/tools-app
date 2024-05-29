import React, { useEffect, useState } from "react";
import axios from "axios";
import { SCRIPT } from "./config";

export async function getGenerators() {
  try {
    const generators = await axios.get(`${SCRIPT}/blocks-monthly`);
    const uniqueGenerators = new Set(
      generators.data.map((gen) => {
        return gen.generator;
      })
    );
    return uniqueGenerators.size;
  } catch (error) {
    console.error(error);
  }
}
