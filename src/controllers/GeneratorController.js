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
      console.error('Error: ' + err.message);
      const status = err.status || 500;
      if (err.message.includes('ETIMEDOUT')) err.message = 'Probably your VPN is down';
      res.status(status).send({
        message: err.message,
        status,
        tips: err.tips,
      });
    }
  }
}

module.exports = GeneratorController;
