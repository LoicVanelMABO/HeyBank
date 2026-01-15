# 🏦 HeyBank - La banque simplifiée

![Angular](https://img.shields.io/badge/Angular-18.2.6-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)

Application bancaire moderne développée avec Angular, offrant une gestion complète des comptes, transactions et transferts avec une interface utilisateur intuitive et sécurisée.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Démarrage](#-démarrage)
- [Technologies](#-technologies-utilisées)
- [Structure du projet](#-structure-du-projet)
- [API Backend](#-api-backend)
- [Sécurité](#-sécurité)
- [Équipe](#-équipe)

## ✨ Fonctionnalités

### Authentification
- 🔐 Inscription et connexion sécurisées
- 🔢 Code PIN à 6 chiffres avec clavier aléatoire (sécurité renforcée)
- 🔒 Gestion des sessions avec JWT
- 👤 Vérification de l'existence d'utilisateur

### Dashboard
- 📊 Vue d'ensemble des comptes et soldes
- 💰 Solde total agrégé
- 📈 Statistiques financières (nombre de comptes, transactions récentes, cashback)
- ⚡ Actions rapides (Nouveau compte, Virement, Transactions, etc.)

### Gestion des comptes
- ➕ Création de nouveaux comptes
- 📋 Liste de tous les comptes avec soldes
- 🔍 Détails d'un compte spécifique
- 📊 Historique des transactions par compte

### Transactions
- 💸 Création de nouvelles transactions
- 📜 Liste des transactions avec filtres (par statut, recherche textuelle)
- 🎯 Détails d'une transaction
- ❌ Annulation de transaction (si statut ≠ completed)
- ✅ Confirmation visuelle après création
- 🔄 Actualisation en temps réel du statut

### Profil utilisateur
- 👤 Affichage des informations personnelles
- 🏷️ Code client unique
- 🚪 Déconnexion sécurisée

## 🏗️ Architecture

Le projet suit une architecture modulaire Angular avec séparation des responsabilités :

```
src/app/
├── core/                      # Services, modèles, guards, interceptors
│   ├── guards/               # Protection des routes (authGuard)
│   ├── interceptors/         # HTTP interceptors (auth, error)
│   ├── models/               # Interfaces TypeScript
│   └── services/             # Services métier
├── features/                 # Modules fonctionnels
│   ├── auth/                # Authentification
│   ├── dashboard/           # Tableau de bord
│   ├── accounts/            # Gestion des comptes
│   ├── transactions/        # Gestion des transactions
│   ├── profile/             # Profil utilisateur
│   └── home/                # Page d'accueil
├── layout/                   # Composants de mise en page
│   ├── header/              # En-tête avec navigation
│   └── footer/              # Pied de page
└── shared/                   # Composants réutilisables
    ├── components/          # Composants partagés
    ├── directives/          # Directives personnalisées
    └── pipes/               # Pipes personnalisés
```

### Principes de conception

- **Standalone Components** : Utilisation des composants autonomes Angular 18
- **Reactive Forms** : Validation robuste avec FormBuilder
- **RxJS Observables** : Gestion asynchrone des données
- **Route Guards** : Protection des routes authentifiées
- **HTTP Interceptors** : Injection automatique du token JWT
- **Lazy Loading** : Chargement différé des modules pour optimiser les performances

## 🚀 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm (v9 ou supérieur)
- Angular CLI (v18.2.6)

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone <url-du-repo>
cd HeyBank
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**

Vérifiez le fichier `src/environments/environment.ts` :
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://coding-bank.fly.dev/api'
};
```

## 🎯 Démarrage

### Serveur de développement

```bash
ng serve
```

Naviguez vers `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

### Build de production

```bash
ng build --configuration production
```

Les artefacts de build seront stockés dans le répertoire `dist/`.

### Tests unitaires

```bash
ng test
```

Exécute les tests unitaires via [Karma](https://karma-runner.github.io).

### Linting

```bash
ng lint
```

## 🛠️ Technologies utilisées

### Frontend
- **Angular 18.2.6** - Framework JavaScript
- **TypeScript 5+** - Langage de programmation
- **RxJS** - Programmation réactive
- **Bootstrap 5** - Framework CSS
- **Angular Router** - Navigation
- **Reactive Forms** - Gestion des formulaires

### Outils de développement
- **Angular CLI** - Outil de ligne de commande
- **Karma/Jasmine** - Tests unitaires
- **ESLint** - Linting du code

## 📁 Structure du projet

### Core

- **Guards** : `authGuard` pour protéger les routes authentifiées
- **Interceptors** : Injection automatique du JWT, gestion des erreurs HTTP
- **Models** : Interfaces TypeScript pour Account, Transaction, User, etc.
- **Services** : 
  - `AuthService` : Authentification et gestion des sessions
  - `AccountService` : CRUD des comptes
  - `TransactionService` : Gestion des transactions
  - `DashboardService` : Agrégation des statistiques

### Features

Chaque feature est un module indépendant avec ses composants, templates et styles :

- **Auth** : Login, Register avec digicode sécurisé
- **Dashboard** : Cartes de statistiques et actions rapides
- **Accounts** : Liste, création, détails des comptes
- **Transactions** : Création, liste, filtres, annulation
- **Profile** : Informations utilisateur et déconnexion

### Shared

- **auth-card** : Carte réutilisable pour les pages d'authentification
- **digit-pad** : Clavier numérique avec randomisation (sécurité)

## 🌐 API Backend

L'application communique avec l'API REST hébergée sur :
```
https://coding-bank.fly.dev/api
```

### Endpoints principaux

#### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Utilisateur courant
- `GET /auth/exists/{clientCode}` - Vérification d'existence

#### Comptes
- `GET /accounts` - Liste des comptes
- `POST /accounts` - Créer un compte
- `GET /accounts/{id}` - Détails d'un compte
- `GET /accounts/{id}/transactions` - Transactions d'un compte

#### Transactions
- `POST /transactions` - Créer une transaction
- `GET /transactions/{id}` - Détails d'une transaction
- `POST /transactions/{id}/cancel` - Annuler une transaction

## 🔒 Sécurité

### Authentification
- JWT stocké dans `localStorage`
- Token envoyé automatiquement via interceptor HTTP
- Vérification du token côté serveur

### Protection des routes
- `authGuard` sur toutes les routes privées
- Redirection vers `/login` si non authentifié

### Digicode sécurisé
- Placement aléatoire des chiffres (Fisher-Yates shuffle)
- 2 emplacements vides aléatoires
- Bouton DEL pour corriger les erreurs

### Gestion des erreurs
- Interceptor global pour les erreurs HTTP
- Messages d'erreur utilisateur-friendly
- Gestion des erreurs 401 (non autorisé)



## 📚 Documentation supplémentaire

### Créer un nouveau composant

```bash
ng generate component features/nom-du-composant --standalone
```

### Créer un nouveau service

```bash
ng generate service core/services/nom-du-service
```

### Ajouter une route

Modifier `src/app/app.routes.ts` :
```typescript
{
  path: 'nouvelle-route',
  component: NouveauComponent,
  canActivate: [authGuard]  // Si route protégée
}
```

## 🐛 Dépannage

### Erreur de compilation
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de CORS
Vérifiez que l'URL de l'API est correcte dans `environment.ts`

### Token expiré
Déconnectez-vous et reconnectez-vous

## 📝 Licence

Ce projet a été créé dans un cadre pédagogique à la Coding Factory.

## 🔗 Liens utiles

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

**Développé avec ❤️**
