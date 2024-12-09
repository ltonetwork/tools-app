import axios from "axios";

export class ObuilderApi {
  async track(requestId, ltoNetworkId, env) {
    console.log(requestId, ltoNetworkId, env);
    let url = "";

    if (env === "staging") {
      console.log("STAGING");
      url = `http://obuilder-staging.eba-ftdayif2.eu-west-1.elasticbeanstalk.com/api/v1/getQueueEntriesByRequestId`;
    } else if (env === "prod") {
      url = `http://obuilder-env.eu-west-1.elasticbeanstalk.com/api/v1/getQueueEntriesByRequestId`;
    } else {
      throw new Error("Invalid environment specified");
    }

    try {
      const response = await axios.get(url, {
        params: {
          requestId,
          ltoNetworkId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}
