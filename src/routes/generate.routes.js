const generatorController = require('../controllers/GeneratorController');

module.exports = (app, router) => {
  router.post('/generateLogin', generatorController.GenerateProcessLogin);

  app.use(router);
};
