# Job Applications Tracker

Une application web pour suivre vos candidatures d'emploi, les étapes du processus de recrutement, et organiser vos contacts professionnels.

## 📋 Fonctionnalités

- **Suivi des candidatures** : Organisez vos candidatures par statut (à postuler, en attente, entretien, test technique, acceptée, refusée)
- **Gestion des contacts** : Stockez les informations de vos contacts professionnels
- **Tableau de bord** : Visualisez vos statistiques de candidature avec des graphiques
- **Rappels** : Recevez des notifications pour les candidatures nécessitant un suivi
- **Édition en temps réel** : Modifiez les informations des offres facilement

## 🚀 Démarrage rapide (Environnement de Développement)

### Prérequis

- [Docker](https://www.docker.com/get-started) et [Docker Compose](https://docs.docker.com/compose/install/)
- Git

### Installation avec Docker (recommandé)

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/job-applications-tracker.git
   cd job-applications-tracker
   ```

2. Lancez l'application avec Docker Compose :
   ```bash
   docker-compose up -d
   ```

3. Accédez à l'application dans votre navigateur :
   ```
   http://localhost:5173
   ```

La configuration Docker active le hot-reloading pour le développement, donc toutes les modifications que vous apportez aux fichiers source seront automatiquement reflétées dans l'application.

### Installation manuelle (sans Docker)

Si vous préférez exécuter l'application sans Docker :

1. Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine

2. Pour le backend :
   ```bash
   cd Backend
   npm install
   npm run dev
   ```

3. Pour le frontend :
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## 🧰 Stack Technique

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- Recharts pour les visualisations
- React Hook Form & Zod pour la gestion des formulaires

### Backend
- Node.js
- Express
- MongoDB avec Mongoose
- JWT pour l'authentification
- Winston pour les logs

### Infrastructure
- Docker & Docker Compose
- Nginx comme serveur web et proxy inverse

## 🔧 Structure du projet

```
job-applications-tracker/
├── Backend/                  # API NodeJS
│   ├── config/               # Configuration
│   ├── controllers/          # Contrôleurs
│   ├── middleware/           # Middleware
│   ├── models/               # Modèles Mongoose
│   ├── routes/               # Routes API
│   ├── utils/                # Utilitaires
│   └── server.js             # Point d'entrée
├── Frontend/                 # Application React
│   ├── public/               # Assets publics
│   └── src/                  # Code source
│       ├── components/       # Composants React
│       ├── hooks/            # Hooks personnalisés
│       ├── layouts/          # Layouts
│       ├── pages/            # Pages
│       ├── services/         # Services API
│       └── types/            # Types TypeScript
└── docker-compose.yml        # Configuration Docker Compose
```

## 🔄 API Endpoints

### Authentification
- `POST /api/v1/auth/register` - Créer un compte
- `POST /api/v1/auth/login` - Se connecter
- `GET /api/v1/auth/me` - Profil utilisateur

### Candidatures
- `GET /api/v1/applications` - Lister toutes les candidatures
- `POST /api/v1/applications` - Créer une candidature
- `GET /api/v1/applications/:id` - Détails d'une candidature
- `PUT /api/v1/applications/:id` - Mettre à jour une candidature
- `DELETE /api/v1/applications/:id` - Supprimer une candidature

### Contacts
- `GET /api/v1/contacts` - Lister tous les contacts
- `POST /api/v1/contacts` - Créer un contact
- `GET /api/v1/contacts/:id` - Détails d'un contact
- `PUT /api/v1/contacts/:id` - Mettre à jour un contact
- `DELETE /api/v1/contacts/:id` - Supprimer un contact

### Statistiques
- `GET /api/v1/stats` - Obtenir les statistiques

### Rappels
- `GET /api/v1/reminders` - Obtenir les candidatures à relancer
- `PUT /api/v1/reminders/:id/meeting` - Définir une date de rendez-vous
- `PUT /api/v1/reminders/:id/test` - Définir une date de test

## 📖 Documentation

Plus d'informations sur le développement et l'extension du projet sont disponibles dans le répertoire `/docs` (à venir).

## 🐛 Résolution des problèmes courants

### L'application ne démarre pas
- Vérifiez que les ports 80, 3000 et 27017 sont disponibles
- Assurez-vous que Docker est en cours d'exécution
- Vérifiez les logs des containers : `docker-compose logs`

### Erreurs de connexion à la base de données
- Vérifiez que le service MongoDB est opérationnel : `docker-compose ps`
- Inspectez les logs MongoDB : `docker-compose logs mongodb`

### Réinitialisation complète
Si vous souhaitez réinitialiser complètement l'application et ses données :
```bash
docker-compose down -v
docker-compose up -d
```

## 🚧 Maintenance

### Mise à jour
Pour mettre à jour l'application vers la dernière version :
```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Sauvegardes
Pour sauvegarder les données MongoDB :
```bash
docker exec jobapp-mongodb sh -c 'mongodump --archive' > db_backup_$(date +%Y-%m-%d).archive
```

Pour restaurer une sauvegarde :
```bash
cat db_backup_YYYY-MM-DD.archive | docker exec -i jobapp-mongodb sh -c 'mongorestore --archive'
```