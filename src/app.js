const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
require('dotenv').config();

class App {
  constructor() {
    this.app = app;
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
  }

  routes() {
    routes(app)
  }
}

const Application = new App();
module.exports = {
  app: Application.app,
  App: Application,
}