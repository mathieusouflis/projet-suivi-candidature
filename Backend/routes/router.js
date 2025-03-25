// TODO: Importer Express
// const express = require('express');

// TODO: Importer tous les fichiers de routes
// - App.routes.js
// - Application.routes.js
// - Dashboard.routes.js
// - Reminder.routes.js
// - Stats.routes.js
// - Username.routes.js
// - Email.routes.js

// TODO: Créer une fonction d'initialisation des routes
/**
 * Initialise tous les routeurs de l'application et les configure avec les middlewares nécessaires
 * @param {Express.Application} app - L'instance de l'application Express
 * @param {Object} config - La configuration de l'application
 */
// const initializeRoutes = (app, config) => {
//   // Configurer les middlewares communs pour toutes les routes
//   // - body-parser pour parser le JSON
//   // - cors pour gérer les requêtes cross-origin
//   // - helmet pour la sécurité
//   // - etc.
//
//   // Monter tous les routeurs avec leurs préfixes respectifs
//   // app.use(config.api.prefix, appRoutes);
//   // app.use(`${config.api.prefix}/applications`, applicationRoutes);
//   // app.use(`${config.api.prefix}/dashboard`, dashboardRoutes);
//   // app.use(`${config.api.prefix}/reminders`, reminderRoutes);
//   // app.use(`${config.api.prefix}/stats`, statsRoutes);
//   // app.use(`${config.api.prefix}/username`, usernameRoutes);
//   // app.use(`${config.api.prefix}/email`, emailRoutes);
//
//   // Configurer le middleware de gestion des erreurs globales
//   // app.use(errorHandler);
//
//   // Configurer la route 404 pour les routes non trouvées
//   // app.use('*', notFoundHandler);
// };

// Exporter la fonction d'initialisation pour l'utiliser dans server.js
// module.exports = { initializeRoutes };