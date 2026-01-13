# Architecture HeyBank - Projet Angular

## 📁 Structure du projet

```
HeyBank/
├── src/
│   ├── app/
│   │   ├── core/                    # Module Core (singleton services)
│   │   │   ├── guards/              # Route guards (auth.guard.ts)
│   │   │   ├── interceptors/        # HTTP interceptors (auth.interceptor.ts, error.interceptor.ts)
│   │   │   ├── models/              # Interfaces et types TypeScript
│   │   │   └── services/            # Services globaux (auth.service.ts, api.service.ts)
│   │   │
│   │   ├── shared/                  # Composants réutilisables
│   │   │   ├── components/          # Boutons, modals, cartes, loaders, etc.
│   │   │   ├── directives/          # Directives personnalisées
│   │   │   └── pipes/               # Pipes (currency, date, etc.)
│   │   │
│   │   ├── features/                # Modules fonctionnels (lazy loaded)
│   │   │   ├── auth/                # Authentification
│   │   │   │   ├── components/      # login, register, forgot-password
│   │   │   │   ├── services/        # auth-specific services
│   │   │   │   └── auth.routes.ts
│   │   │   │
│   │   │   ├── dashboard/           # Tableau de bord
│   │   │   │   ├── components/      # dashboard-overview, widgets
│   │   │   │   └── dashboard.routes.ts
│   │   │   │
│   │   │   ├── accounts/            # Comptes bancaires
│   │   │   │   ├── components/      # account-list, account-detail
│   │   │   │   ├── services/        # account.service.ts
│   │   │   │   └── accounts.routes.ts
│   │   │   │
│   │   │   ├── transactions/        # Transactions
│   │   │   │   ├── components/      # transaction-list, transaction-detail
│   │   │   │   ├── services/        # transaction.service.ts
│   │   │   │   └── transactions.routes.ts
│   │   │   │
│   │   │   ├── transfers/           # Virements
│   │   │   │   ├── components/      # transfer-form, beneficiary-list
│   │   │   │   ├── services/        # transfer.service.ts
│   │   │   │   └── transfers.routes.ts
│   │   │   │
│   │   │   └── profile/             # Profil utilisateur
│   │   │       ├── components/      # profile-view, profile-edit
│   │   │       └── profile.routes.ts
│   │   │
│   │   ├── layout/                  # Composants de mise en page
│   │   │   ├── header/              # header.component.ts
│   │   │   ├── footer/              # footer.component.ts
│   │   │   └── sidebar/             # sidebar.component.ts
│   │   │
│   │   ├── app.component.ts         # Composant racine
│   │   ├── app.config.ts            # Configuration de l'app
│   │   └── app.routes.ts            # Routes principales
│   │
│   ├── assets/                      # Ressources statiques
│   │   ├── images/                  # Images (logos, illustrations)
│   │   ├── icons/                   # Icônes SVG
│   │   └── fonts/                   # Polices personnalisées
│   │
│   ├── environments/                # Configuration par environnement
│   │   ├── environment.ts           # Dev
│   │   └── environment.prod.ts      # Production
│   │
│   ├── styles.css                   # Styles globaux
│   └── index.html                   # Point d'entrée HTML
│
├── angular.json                     # Configuration Angular CLI
├── package.json                     # Dépendances npm
├── tsconfig.json                    # Configuration TypeScript
└── README.md                        # Documentation du projet
```

## 🎯 Principes d'architecture

### 1. **Core Module**
- Services singleton uniquement (`providedIn: 'root'`)
- Guards pour protéger les routes
- Interceptors pour gérer les requêtes HTTP
- Models/Interfaces partagés

### 2. **Shared Module**
- Composants UI réutilisables
- Directives et pipes personnalisés
- Pas de logique métier spécifique

### 3. **Features Modules**
- Organisation par domaine métier
- Lazy loading systématique
- Standalone components recommandés
- Services spécifiques au module dans `services/`

### 4. **Layout Module**
- Composants de mise en page (header, footer, sidebar)
- Réutilisables sur toutes les pages

## 🚀 Conventions de nommage

### Fichiers
- **Composants** : `feature-name.component.ts`
- **Services** : `feature-name.service.ts`
- **Guards** : `feature-name.guard.ts`
- **Interceptors** : `feature-name.interceptor.ts`
- **Models** : `feature-name.model.ts` ou `feature-name.interface.ts`
- **Routes** : `feature-name.routes.ts`

### Classes
- **Composants** : `FeatureNameComponent`
- **Services** : `FeatureNameService`
- **Guards** : `FeatureNameGuard`
- **Interceptors** : `FeatureNameInterceptor`

## 📦 Workflow Git

### Branches
- `main` : production
- `develop` : développement
- `feature/nom-feature` : nouvelles fonctionnalités
- `fix/nom-bug` : corrections de bugs

### Convention de commits
```
feat: ajout de la fonctionnalité X
fix: correction du bug Y
refactor: restructuration du code Z
docs: mise à jour de la documentation
style: formatage du code
test: ajout de tests
```

## 🛠️ Commandes utiles

```bash
# Générer un composant dans un feature
ng g c features/auth/components/login --standalone

# Générer un service
ng g s core/services/auth

# Générer un guard
ng g g core/guards/auth

# Générer un interceptor
ng g interceptor core/interceptors/auth

# Générer un pipe
ng g pipe shared/pipes/currency-format

# Lancer le serveur de dev
npm start

# Build de production
npm run build
```

## 📚 Ressources

- API Backend : https://coding-bank.fly.dev/api
- Documentation Angular : https://angular.io
- Guide de style Angular : https://angular.io/guide/styleguide

## 👥 Collaboration

1. Créer une branche feature depuis `develop`
2. Développer la fonctionnalité
3. Tester localement
4. Créer une Pull Request vers `develop`
5. Code review par un pair
6. Merge après validation
