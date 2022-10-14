class Validator {
  static verifyCredentials(cpf, password) {
    if (!cpf || !password) throw new Error('CPF or PASSWORD was not informed');
  }

  static cleanAuthorizationHeader(authorization) {
    if (authorization) {
      return authorization.replace('Bearer ', '');
    }
    return authorization;
  }
}

module.exports = Validator;
