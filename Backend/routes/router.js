const appRoutes = require("./App.routes");
const {
  errorHandler,
  notFoundHandler,
} = require("../middleware/ErrorHandler.middleware");

const initializeRoutes = (app, config) => {
  const apiPrefix = config.app.api.prefix;

  app.use(apiPrefix, appRoutes);

  app.use(errorHandler);

  app.use("*", notFoundHandler);
};

module.exports = { initializeRoutes };
