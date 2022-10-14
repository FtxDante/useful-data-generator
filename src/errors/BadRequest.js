const Exceptions = require('./Exceptions');

class BadRequest extends Exceptions {
  constructor(message, stack = '') {
    super('BAD_REQUEST', message, 400, stack);
  }
}

module.exports = BadRequest;