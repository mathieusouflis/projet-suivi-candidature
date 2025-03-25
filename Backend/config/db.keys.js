const dbKeys = {
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  
  encryptionKey: process.env.DB_ENCRYPTION_KEY || 'your-encryption-key',
  encryptionIV: process.env.DB_ENCRYPTION_IV || 'your-initialization-vector',
  
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key',
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret-key',
  
  hashAlgorithm: 'sha256',
  hashIterations: 1000
};

module.exports = dbKeys;