const { initDatabase } = require('./database/init');

const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error('Impossible de démarrer le serveur:', error);
    process.exit(1);
  }
};

startServer();