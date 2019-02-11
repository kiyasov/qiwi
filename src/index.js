import axios from "axios";

export default class QiwiBot {
  constructor(props) {
    this.props = props;
  }

  sendAuthenticatedRequest = async ({ method = "post", url, data = {} }) => {
    let { accessToken } = this.props;

    try {
      let { data: response } = await axios({
        method,
        url: `https://edge.qiwi.com${url}`,
        headers: {
          Authorization: "Bearer " + accessToken
        },
        data
      });

      return response;
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        };
      } else if (error.request) {
        return error.request;
      }

      return error.message;
    }
  };

  accountInfo = async () => {
    return await this.sendAuthenticatedRequest({
      method: "get",
      url: "/person-profile/v1/profile/current"
    });
  };

  balanceInfo = async () => {
    let { personId } = this.props;

    return await this.sendAuthenticatedRequest({
      method: "get",
      url: `/funding-sources/v2/persons/${personId}/accounts`
    });
  };

  processPayment = async ({ pattern_id, data }) => {
    return await this.sendAuthenticatedRequest({
      url: `/sinap/api/v2/terms/${pattern_id}/payments`,
      data
    });
  };
}
