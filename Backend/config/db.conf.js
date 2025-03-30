const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || "candidatures-app",

  authSource: process.env.DB_AUTH_SOURCE || "admin",

  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    autoIndex: process.env.NODE_ENV !== "production",
    retryWrites: true,
  },

  schemaDefaults: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },

  migrations: {
    directory: "./database/migrations",
    tableName: "migrations",
  },

  seeds: {
    directory: "./database/seeds",
    runOnStart: process.env.NODE_ENV === "development",
  },
};

module.exports = dbConfig;
