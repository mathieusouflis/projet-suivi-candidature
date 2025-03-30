const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    env: process.env.NODE_ENV || "development",
  },

  api: {
    prefix: "/api/v1",
    version: "1.0.0",
    timeout: 30000,
  },

  security: {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },

  logs: {
    level: process.env.LOG_LEVEL || "info",
    file: process.env.LOG_FILE || "application.log",
  },

  uploads: {
    directory: "./uploads",
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
  },
};

module.exports = config;
