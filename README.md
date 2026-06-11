# 📚 Librarium — Système de Gestion de Bibliothèque

> Projet de Fin d'Études (PFE) — Application Full-Stack de gestion de bibliothèque avec interface admin et portail utilisateur.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📋 Table des Matières

- [Aperçu du Projet](#-aperçu-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture du Projet](#-architecture-du-projet)
- [Technologies Utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation & Lancement](#-installation--lancement)
- [Variables d'Environnement](#-variables-denvironnement)
- [API Endpoints](#-api-endpoints)
- [Structure des Dossiers](#-structure-des-dossiers)
- [Auteurs](#-auteurs)

---

## 🌟 Aperçu du Projet

**Librarium** est une application web complète de gestion de bibliothèque développée dans le cadre d'un Projet de Fin d'Études. Elle offre deux espaces distincts :

- 🔑 **Portail Admin** : Gestion complète des livres, utilisateurs, emprunts et tableau de bord analytique.
- 📖 **Portail Utilisateur** : Navigation dans le catalogue, emprunt de livres, suivi des prêts et gestion du profil.

L'application repose sur une architecture **Full-Stack** avec un frontend React moderne et un backend REST API Node.js connecté à une base de données PostgreSQL.

---

## ✅ Fonctionnalités

### 👤 Espace Utilisateur
- 🔐 Inscription / Connexion sécurisée (JWT)
- 🏠 Page d'accueil et landing page attractive
- 🔍 Catalogue des livres avec recherche et filtrage
- 📄 Fiche détaillée de chaque livre
- 📦 Emprunt et retour de livres
- 📋 Suivi de mes emprunts en cours et historique
- ⚙️ Gestion du profil et des paramètres

### 🛡️ Espace Administrateur
- 📊 Tableau de bord analytique (statistiques, graphiques Recharts)
- 📚 Gestion complète des livres (Ajouter, Modifier, Supprimer)
- 👥 Gestion des utilisateurs (liste, création, activation)
- 📋 Suivi global de tous les emprunts
- 🔒 Accès protégé par rôle (middleware JWT)

---

## 🏗️ Architecture du Projet

```
dargui-hacha-pfe/
├── src/                    # Frontend React
│   ├── components/         # Composants réutilisables (Navbar, Sidebar, etc.)
│   ├── contexts/           # Contextes React (Auth, etc.)
│   ├── hooks/              # Hooks personnalisés (useLoans, etc.)
│   ├── layouts/            # Layouts Admin & User
│   ├── pages/
│   │   ├── admin/          # Dashboard, Books, Users, Loans, CreateBook, EditBook, CreateUser
│   │   ├── user/           # Landing, Library, BookDetails, MyLoans, Profile, Settings
│   │   └── auth/           # Login, Register
│   ├── services/           # Appels API (axios)
│   └── styles/             # CSS global
│
└── backend/                # Backend Node.js / Express
    ├── server.js            # Point d'entrée du serveur
    └── src/
        ├── config/          # Configuration base de données (Sequelize)
        ├── controllers/     # Logique métier (auth, books, users, borrows, reservations, dashboard)
        ├── middleware/      # Middleware d'authentification JWT
        ├── models/          # Modèles Sequelize (User, Book, Borrow, Reservation)
        └── routes/          # Définition des routes API
```

---

## 🛠️ Technologies Utilisées

### Frontend
| Technologie | Version | Rôle |
|---|---|---|
| React | 18.2 | Framework UI |
| React Router DOM | 6.x | Navigation SPA |
| Tailwind CSS | 3.x | Styling utilitaire |
| Framer Motion | 12.x | Animations |
| Recharts | 3.x | Graphiques & Analytics |
| Axios | 1.6 | Requêtes HTTP |
| Lucide React | latest | Icônes |
| React Hot Toast | 2.x | Notifications |

### Backend
| Technologie | Version | Rôle |
|---|---|---|
| Node.js + Express | 5.x | Serveur REST API |
| Sequelize | 6.x | ORM |
| PostgreSQL | latest | Base de données |
| JSON Web Token (JWT) | 9.x | Authentification |
| bcryptjs | 3.x | Hachage des mots de passe |
| dotenv | latest | Variables d'environnement |
| nodemon | 3.x | Rechargement automatique (dev) |
| CORS | 2.x | Gestion des origines croisées |

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [PostgreSQL](https://www.postgresql.org/) (v14 ou supérieur)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)

---

## 🚀 Installation & Lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/dargui-hacha-pfe.git
cd dargui-hacha-pfe
```

### 2. Configurer la base de données

Ouvrir **pgAdmin** ou **psql** et créer la base de données :

```sql
CREATE DATABASE library_db;
```

### 3. Configurer les variables d'environnement du backend

Copier le fichier `.env.example` (ou créer un nouveau `.env`) dans le dossier `backend/` :

```bash
cp backend/.env.example backend/.env
```

Puis remplir les valeurs (voir section [Variables d'Environnement](#-variables-denvironnement)).

### 4. Installer toutes les dépendances

```bash
# Depuis la racine du projet — installe les dépendances frontend + backend
npm install
cd backend && npm install && cd ..
```

### 5. Lancer l'application (Frontend + Backend simultanément)

```bash
npm run dev
```

> L'application utilise **concurrently** pour démarrer les deux serveurs en parallèle.

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

## 🔑 Variables d'Environnement

Créer un fichier `.env` dans le dossier `backend/` avec le contenu suivant :

```env
PORT=5000
NODE_ENV=development

# Base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_db
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# JWT
JWT_SECRET=votre_cle_secrete_jwt_tres_longue
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

> ⚠️ **Ne jamais committer le fichier `.env` avec de vraies données en production !**

---

## 📡 API Endpoints

### 🔐 Authentification — `/api/auth`
| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Inscription d'un nouvel utilisateur |
| `POST` | `/api/auth/login` | Connexion et obtention du token JWT |

### 📚 Livres — `/api/books`
| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/books` | Liste de tous les livres | ✅ |
| `GET` | `/api/books/:id` | Détail d'un livre | ✅ |
| `POST` | `/api/books` | Ajouter un livre | 🔒 Admin |
| `PUT` | `/api/books/:id` | Modifier un livre | 🔒 Admin |
| `DELETE` | `/api/books/:id` | Supprimer un livre | 🔒 Admin |

### 👥 Utilisateurs — `/api/users`
| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/users` | Liste des utilisateurs | 🔒 Admin |
| `PUT` | `/api/users/:id` | Modifier un utilisateur | 🔒 Admin |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur | 🔒 Admin |

### 📋 Emprunts — `/api/borrows`
| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/borrows` | Tous les emprunts | 🔒 Admin |
| `POST` | `/api/borrows` | Créer un emprunt | ✅ |
| `PUT` | `/api/borrows/:id/return` | Retourner un livre | ✅ |

### 📅 Réservations — `/api/reservations`
| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/reservations` | Mes réservations | ✅ |
| `POST` | `/api/reservations` | Créer une réservation | ✅ |
| `DELETE` | `/api/reservations/:id` | Annuler une réservation | ✅ |

### 📊 Dashboard — `/api/dashboard`
| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/dashboard/stats` | Statistiques globales | 🔒 Admin |

---

## 📁 Structure des Dossiers (Détaillée)

```
src/
├── App.js                     # Routage principal de l'application
├── index.js                   # Point d'entrée React
├── components/                # Composants UI partagés
├── contexts/
│   ├── AuthContext.js          # Contexte d'authentification global
│   └── ...
├── hooks/
│   ├── useLoans.jsx            # Hook de gestion des emprunts
│   └── ...
├── layouts/
│   ├── AdminLayout.jsx         # Layout avec sidebar admin
│   └── UserLayout.jsx          # Layout avec navbar utilisateur
├── pages/
│   ├── admin/
│   │   ├── Dashboard.jsx       # Analytiques & statistiques
│   │   ├── Books.jsx           # CRUD livres
│   │   ├── CreateBook.jsx      # Formulaire ajout livre
│   │   ├── EditBook.jsx        # Formulaire modification livre
│   │   ├── Users.jsx           # Gestion utilisateurs
│   │   ├── CreateUser.jsx      # Formulaire ajout utilisateur
│   │   └── Loans.jsx           # Suivi global des emprunts
│   ├── user/
│   │   ├── Landing.jsx         # Page d'accueil publique
│   │   ├── Library.jsx         # Catalogue des livres
│   │   ├── BookDetails.jsx     # Fiche détaillée d'un livre
│   │   ├── MyLoans.jsx         # Mes emprunts
│   │   ├── Profile.jsx         # Profil utilisateur
│   │   └── Settings.jsx        # Paramètres
│   └── auth/
│       ├── Login.jsx           # Page de connexion
│       └── Register.jsx        # Page d'inscription
└── services/
    ├── api.jsx                  # Instance Axios configurée
    ├── authService.js           # Appels API auth
    ├── bookService.js           # Appels API livres
    ├── loanService.js           # Appels API emprunts
    └── ...

backend/src/
├── config/
│   └── database.js             # Configuration Sequelize / PostgreSQL
├── controllers/
│   ├── authController.js       # Register, Login
│   ├── bookController.js       # CRUD livres
│   ├── userController.js       # CRUD utilisateurs
│   ├── borrowController.js     # Gestion emprunts
│   ├── reservationController.js
│   └── dashboardController.js  # Statistiques
├── middleware/
│   └── authMiddleware.js       # Vérification JWT & rôles
├── models/
│   ├── User.js
│   ├── Book.js
│   ├── Borrow.js
│   └── Reservation.js
└── routes/
    ├── authRoutes.js
    ├── bookRoutes.js
    ├── userRoutes.js
    ├── borrowRoutes.js
    ├── reservationRoutes.js
    └── dashboardRoutes.js
```

---

## 👨‍💻 Auteurs

<table>
  <tr>
    <td align="center">
      <strong>Oussama Dargui</strong><br/>
      <em>Développeur Full-Stack</em>
    </td>
    <td align="center">
      <strong>Ayoub Hacha</strong><br/>
      <em>Développeur Full-Stack</em>
    </td>
  </tr>
</table>

---

## 📄 Licence

Ce projet est réalisé dans le cadre d'un **Projet de Fin d'Études (PFE)**. Tous droits réservés © 2025.
