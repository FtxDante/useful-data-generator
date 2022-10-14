const GeneratorService = require('../services/GeneratorService');
const Validator = require('../utils/validator');

class GeneratorController {
  static async GenerateProcessLogin(req, res) {
    const generatorService = new GeneratorService();
    const { cpf, password } = req.body;
    let { authorization } = req.headers;
    try {
      Validator.verifyCredentials(cpf, password);
      authorization = Validator.cleanAuthorizationHeader(authorization);
      const result = await generatorService.getProcessLoginBody(cpf, password, authorization);
      return res.status(200).send(result);
    } catch (err) {
      if (err.message.includes('ETIMEDOUT') || err.message.includes('ECONNREFUSED')) {
        err.message = 'Probably your VPN is down or your .ENV is badly configured';
      }
      console.error('Error: ' + err.message);
      const status = err.status || 500;

      res.status(status).send({
        message: err.message,
        status,
        tips: err.tips,
      });
    }
  }
}

module.exports = GeneratorController;
