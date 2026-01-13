# Features Module

Ce dossier contient les modules fonctionnels de l'application, organisés par domaine métier.

## Modules disponibles

- **auth/** : Authentification (login, register, forgot-password)
- **dashboard/** : Tableau de bord principal
- **accounts/** : Gestion des comptes bancaires
- **transactions/** : Historique et détails des transactions
- **transfers/** : Virements et transferts
- **profile/** : Profil utilisateur

## Structure d'un module feature

```
feature/
├── components/        # Composants du module
├── services/          # Services spécifiques au module
├── feature.routes.ts  # Routes du module
└── README.md          # Documentation du module
```

## Règles

- Chaque feature est indépendante
- Utiliser le lazy loading pour les routes
- Privilégier les standalone components
