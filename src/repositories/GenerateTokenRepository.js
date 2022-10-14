const axios = require('axios');
const https = require('https');
const BadRequest = require('../errors/BadRequest');
require('dotenv').config();

class GenerateToken {
  constructor() {
    this.axios = axios;
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getToken4P(cpf, password) {
    const url = `${process.env.HOST_GERAR_TOKEN}:${process.env.PORT_GERAR_TOKEN}/gera-token-4p`;
    try {
      const { data } = await this.axios.post(
        url,
        {
          loginOption: 'cpf',
          infos: {
            cpf,
            password,
          },
        },
        { httpsAgent: this.httpsAgent }
      );
      if (!data) throw new BadRequest('Token was not generated');
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = GenerateToken;
