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
   cd backend
   npm install

   ```

2. **Fichier .env (à créer à la racine) :**

   ```bash
   PORT=5000
   FRONTEND_URI=http://localhost:3000
   DATABASE_URI=mongodb://127.0.0.1:27017/react-node-mongodb

   ```

3. **Lancer le serveur :**

   ```bash
   npm run dev # Développement
   npm run build # Build production
   npm run start # Production (après build)

   ```

## Architecture du Code

- /uploads : Les fichiers téléchargés (images de campagnes)
- src/index.ts : Point d'entrée
- src/config/db.ts : Gestion de la connexion MongoDB (Mongoose)
- src/controllers/ : Logique métier
- src/routes/ : Définition des points d'accès API
- src/models/ : Schémas de données
- src/lib/ : Configurations tierces et Utilitaires (Upload, Logger, Helpers)

# Frontend

Interface utilisateur moderne pour la gestion et le monitoring de campagnes publicitaires, optimisée pour la performance et l'expérience utilisateur.

---

## Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript (Strict Mode)
- **Gestion d'État** : Redux Toolkit (RTK)
- **Formulaires** : React Hook Form & Zod
- **UI & Design** : Tailwind CSS & Shadcn/ui
- **Requêtes API** : Fetch

---

## Configuration Rapide

1. **Installer les dépendances :**

   ```bash
   cd frontend
   npm install

   ```

2. **Fichier .env (à créer à la racine) :**

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NODE_ENV=development

   ```

3. **Lancer le serveur :**

   ```bash
   npm run dev # Développement
   npm run build # Build production
   npm run start # Production (après build)

   ```

## Architecture du Code

- src/app/ : Pages, layouts et routing (Next.js App Router)
- src/components/ : Composants UI réutilisables (Select, Field)
- src/lib/ : Configurations tierces et utilitaires
- src/providers/ : Wrappers de contexte (Utils)
- src/redux/ : Configuration Redux et Slices
- src/types/ : Définitions des interfaces TypeScript (Campaign, Stats)
- src/public/ : Assets statiques du frontend (Default Images)
