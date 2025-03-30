const dbKeys = {
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",

  encryptionKey: process.env.DB_ENCRYPTION_KEY || "your-encryption-key",
  encryptionIV: process.env.DB_ENCRYPTION_IV || "your-initialization-vector",

  jwtSecret:
    process.env.JWT_SECRET || "default-jwt-secret-do-not-use-in-production",
  sessionSecret:
    process.env.SESSION_SECRET ||
    "default-session-secret-do-not-use-in-production",

  hashAlgorithm: "sha256",
  hashIterations: 1000,
};

if (process.env.NODE_ENV === "production") {
  if (
    dbKeys.jwtSecret === "default-jwt-secret-do-not-use-in-production" ||
    dbKeys.sessionSecret === "default-session-secret-do-not-use-in-production"
  ) {
    console.error("ERROR: Using default secrets in production environment!");
    console.error(
      "Please set JWT_SECRET and SESSION_SECRET environment variables"
    );
    process.exit(1);
  }
}

module.exports = dbKeys;
