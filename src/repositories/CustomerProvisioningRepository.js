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
    const url = `http://10.129.163.190:7010/CustomerProvisioning/searchUser`;
    try {
      const { data } = await this.axios.post(
        url,
        { userID },
        {
          httpsAgent: this.httpsAgent,
          headers: {
            Authorization: 'Basic c3ZjX2NwdXNlcm12YXBwOjc2ZGo2NGxrczlXdDRnODk=',
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
