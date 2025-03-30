const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User.model");
const Job = require("./models/Job.model");
const Contact = require("./models/Contact.model");
const config = require("./config/init").initialize();
const logger = require("./utils/Logger.util");

const initializeDatabase = async () => {
  try {
    const dbConfig = config.db;
    const connString = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

    await mongoose.connect(connString, dbConfig.options);
    logger.info(`MongoDB connecté: ${mongoose.connection.host}`);

    if (config.environment !== "development") {
      logger.info(
        "Initialisation de la base de données ignorée en environnement non-développement"
      );
      return;
    }

    logger.info(
      "Début de l'initialisation de la base de données avec des données de test..."
    );

    await mongoose.connection.dropDatabase();
    logger.info("Base de données nettoyée");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("TestPassword123", salt);

    const testUser = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
      pays: "France",
      statusPro: "Étudiant",
      contacts: [],
    });

    logger.info(`Utilisateur de test créé: ${testUser._id}`);

    const contacts = [
      {
        name: "Sophie",
        lastName: "Martin",
        email: "sophie.martin@techcorp.com",
        tel: "+33123456789",
        role: "Recruteur",
        user_id: testUser._id,
      },
      {
        name: "Thomas",
        lastName: "Dubois",
        email: "thomas.dubois@startupinc.com",
        tel: "+33123456790",
        role: "CTO",
        user_id: testUser._id,
      },
      {
        name: "Julie",
        lastName: "Leroy",
        email: "julie.leroy@bigtech.com",
        tel: "+33123456791",
        role: "RH",
        user_id: testUser._id,
      },
    ];

    const createdContacts = await Contact.insertMany(contacts);
    logger.info(`${createdContacts.length} contacts de test créés`);

    testUser.contacts = createdContacts.map((contact) => contact._id);
    await testUser.save();

    const jobs = [
      {
        title: "Développeur Web Front-End",
        company: "TechCorp",
        type: "Stage",
        link: "https://example.com/job1",
        status: "En attente",
        datePostulation: new Date("2023-11-01"),
        location: "Paris",
        salary: "1000€/mois",
        description: "Stage de développement web front-end utilisant React",
        user_id: testUser._id,
      },
      {
        title: "Développeur Full Stack",
        company: "StartupInc",
        type: "Alternance",
        link: "https://example.com/job2",
        status: "Acceptée",
        datePostulation: new Date("2023-10-15"),
        meetingDate: new Date("2023-10-25"),
        location: "Lyon",
        salary: "1200€/mois",
        description: "Alternance en développement full stack Node.js et React",
        user_id: testUser._id,
      },
      {
        title: "Ingénieur DevOps",
        company: "BigTech",
        type: "Stage",
        link: "https://example.com/job3",
        status: "Refusée",
        datePostulation: new Date("2023-09-20"),
        location: "Bordeaux",
        salary: "1500€/mois",
        description: "Stage en DevOps avec Docker et Kubernetes",
        user_id: testUser._id,
      },
      {
        title: "Développeur Mobile",
        company: "AppStudio",
        type: "Alternance",
        link: "https://example.com/job4",
        status: "En attente",
        datePostulation: new Date("2023-11-10"),
        testDate: new Date("2023-11-20"),
        location: "Marseille",
        salary: "1300€/mois",
        description: "Développement d'applications mobiles avec React Native",
        user_id: testUser._id,
      },
    ];

    const createdJobs = await Job.insertMany(jobs);
    logger.info(`${createdJobs.length} candidatures de test créées`);

    logger.info("Initialisation de la base de données terminée avec succès");

    await mongoose.disconnect();
    logger.info("Déconnecté de MongoDB");
  } catch (error) {
    logger.error(
      `Erreur lors de l'initialisation de la base de données: ${error.message}`
    );
    console.error(error);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      logger.info("Déconnecté de MongoDB suite à une erreur");
    }
  }
};

if (require.main === module) {
  initializeDatabase();
} else {
  module.exports = initializeDatabase;
}
