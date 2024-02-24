export async function getBurned(generators) {
  try {
    let fees = generators.map((data) => {
      let value = data.fees;
      return parseInt(value.replace(/,/g, ""), 10);
    });
    const totalBurned = fees.reduce((total, fee) => total + fee, 0);
    return totalBurned / 2;
  } catch (error) {
    console.error("Error:", error);
  }
}
