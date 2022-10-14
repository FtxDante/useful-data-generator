const generateRoute = require('./generate.routes');
const { Router } = require('express');

module.exports = (app) => {
  generateRoute(app, new Router());
}