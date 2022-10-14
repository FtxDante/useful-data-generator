const axios = require('axios');
const https = require('https');
const BadRequest = require('../errors/BadRequest');
require('dotenv').config();

class SubscribedProductsRepository {
  constructor() {
    this.axios = axios;
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getSubscribedProducts(uuid) {
    const url = process.env.HOST + `/subscribed-products/v4/users/${uuid}/products`;
    try {
      const { data } = await this.axios.get(url, { httpsAgent: this.httpsAgent });
      if (!data.length === 0) new BadRequest('SP was not retrieve products');
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SubscribedProductsRepository;
