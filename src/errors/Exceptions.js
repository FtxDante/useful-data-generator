class Exceptions extends Error {
  constructor(name, message, status, stack = '', tips = 'Verify and try again!') {
    super(message);
    this.name = name;
    this.message = message;
    this.status = status;
    this.stack = stack;
    this.tips = tips;
  }
}

module.exports = Exceptions;