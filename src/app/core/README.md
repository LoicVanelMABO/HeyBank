# Core Module

Ce dossier contient les services singleton, guards, interceptors et models partagés dans toute l'application.

## Structure

- **services/** : Services singleton (auth, API, storage, etc.)
- **guards/** : Route guards pour la protection des routes
- **interceptors/** : HTTP interceptors (token, erreurs, etc.)
- **models/** : Interfaces et types TypeScript partagés

## Règles

- Les services doivent être fournis en `root` (`providedIn: 'root'`)
- Ne jamais dupliquer les services core
- Un seul point d'entrée pour les configurations globales
