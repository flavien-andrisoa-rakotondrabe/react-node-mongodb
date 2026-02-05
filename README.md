# Backend API

API REST robuste pour la gestion de campagnes publicitaires, incluant l'upload de médias, la validation de données et une architecture sécurisée.

---

## Stack Technique

- **Serveur** : Node.js (v18+) & Express.js
- **Langage** : TypeScript (Strict Mode)
- **Base de Données** : MongoDB & Mongoose
- **Sécurité** : Helmet, CORS, Rate-Limit, Compression
- **Traitement Fichiers** : Multer, Crypto (UUID), Path
- **Logs** : Winston Logger

---

## Configuration Rapide

1. **Installer les dépendances :**

   ```bash
   npm install

   ```

2. **Fichier .env (à créer à la racine) :**
   PORT=5000
   FRONTEND_URI=http://localhost:3000
   DATABASE_URI=mongodb://127.0.0.1:27017/react-node-mongodb

3. **Lancer le serveur :**
   npm run dev # Développement
   npm run start # Production (après build)

## Architecture du Code

- src/index.ts : Point d'entrée
- src/config/db.ts : Gestion de la connexion MongoDB (Mongoose)
- src/controllers/ : Logique métier
- src/routes/ : Définition des points d'accès API
- src/models/ : Schémas de données
- src/utils/ : Utilitaires (Upload, Logger, Helpers)
