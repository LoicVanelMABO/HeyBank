import { User } from "./User";

// Interface representant la réponse d'authentification (registeration/connexion)
export interface AuthResponse {
    jwt: string;
    user: User;
}