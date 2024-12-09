import axios from "axios";

// const transactionsPath = path.join(__dirname, "../data/marketData.json");
export class MarketInfo {
  static async getMarketInfo() {
    try {
      const coinGeckoReq = axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "lto-network",
            vs_currencies: "usd",
            include_market_cap: true,
          },
        }
      );

      const binanceReq = axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=LTOUSDT"
      );

      // Race between CoinGecko and Binance requests
      const response = await Promise.race([
        this.timeout(coinGeckoReq, 3000),
        binanceReq,
      ]);

      let dataFromCoinGecko, binancePrice;
      if (response.hasOwnProperty("data")) {
        dataFromCoinGecko = response?.data["lto-network"];
      } else {
        binancePrice = parseFloat(response?.data.price);
      }

      const checkAvailablePrice =
        dataFromCoinGecko && dataFromCoinGecko.usd
          ? dataFromCoinGecko.usd
          : binancePrice;

      const estMarketCap = binancePrice
        ? await this.getMarketCap(checkAvailablePrice)
        : null;

      const result = {
        geckoPrice: dataFromCoinGecko
          ? parseFloat(dataFromCoinGecko.usd.toFixed(3))
          : null,
        geckoMarketCap: dataFromCoinGecko
          ? Math.floor(dataFromCoinGecko.usd_market_cap)
          : null,
        binancePrice: binancePrice ? binancePrice.data.price : null,
        estimatedMarketCap: estMarketCap,
      };

      return result;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async getMarketCap(priceData) {
    try {
      const circulatingSupply = await axios.get(
        `https://stats.ltonetwork.com/v1/stats/supply/circulating`
      );

      return priceData * circulatingSupply.data;
    } catch (error) {}
  }

  static async timeout(promise, ms) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject(new Error("Timed out"));
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    });
  }
}
