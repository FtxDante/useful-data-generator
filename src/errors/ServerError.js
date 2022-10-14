const Exceptions = require('./Exceptions');

class ServerError extends Exceptions {
  constructor(message) {
    super('INTERNAL_SERVER_ERROR', message, this.status)
  }
}