import axios from "axios";

const API_CONFIG = {
  staging: {
    baseURL:
      "http://obuilder-staging.eba-ftdayif2.eu-west-1.elasticbeanstalk.com",
    timeout: 10000,
  },
  prod: {
    baseURL: "https://obuilder.lto.network",
    timeout: 10000,
  },
};

export class ObuilderApi {
  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async track(requestId, ltoNetworkId, env = "prod") {
    const config = API_CONFIG[env];
    if (!config) {
      throw new Error(`Invalid environment specified: ${env}`);
    }

    try {
      const response = await this.axiosInstance.get(
        `${config.baseURL}/api/v1/getQueueEntriesByRequestId`,
        {
          params: {
            requestId,
            ltoNetworkId,
          },
          timeout: config.timeout,
        }
      );

      if (!response.data) {
        throw new Error("No data received from the server");
      }

      return response.data;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timed out. Please try again.");
      }
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${error.response.statusText}`
        );
      }
      if (error.request) {
        throw new Error("Network error. Please check your connection.");
      }
      throw new Error("An unexpected error occurred while fetching data.");
    }
  }
}
