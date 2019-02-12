import axios from "axios";
import _ from "lodash";

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

  transactionsInfo = async transactionId => {
    return await this.sendAuthenticatedRequest({
      method: "get",
      url: `/payment-history/v2/transactions/${transactionId}`
    });
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
    let response = await this.sendAuthenticatedRequest({
      url: `/sinap/api/v2/terms/${pattern_id}/payments`,
      data
    });

    let isPay = false;

    do {
      let { errorCode, error, status } = await this.transactionsInfo(
        response.transaction.id
      );

      if (_.toInteger(errorCode) !== 0) {
        throw new Error(error);
      }

      if (status !== "WAITING") {
        isPay = true;
      }
    } while (!isPay);

    return response;
  };
}
