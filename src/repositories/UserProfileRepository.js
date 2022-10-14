const axios = require('axios');
const https = require('https');
const BadRequest = require('../errors/BadRequest');
require('dotenv').config();

class UserProfileRepository {
  constructor() {
    this.axios = axios;
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getUserProfile(uuid) {
    const url = process.env.HOST + `/userprofile/v4/users/${uuid}`;
    try {
      const { data } = await this.axios.get(url, { httpsAgent: this.httpsAgent });

      if (!data) new BadRequest('UP was not retrieve profile');
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserProfileRepository;
