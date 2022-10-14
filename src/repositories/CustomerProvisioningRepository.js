const axios = require('axios');
const https = require('https');
const BadRequest = require('../errors/BadRequest');
require('dotenv').config();

class CustomerProvisioningRepository {
  constructor() {
    this.axios = axios;
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getCustomerProvisioning(userID) {
    const url = `${process.env.HOST_CUSTOMER_PROVISIONING}/CustomerProvisioning/searchUser`;
    try {
      const { data } = await this.axios.post(
        url,
        { userID },
        {
          httpsAgent: this.httpsAgent,
          headers: {
            Authorization: `Basic ${process.env.AUTH_CUSTOMER_PROVISIONING}`,
          },
        }
      );
      if (data.length === 0) throw new BadRequest(`User not found, please verify ID, userID: ${userID}`);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CustomerProvisioningRepository;
