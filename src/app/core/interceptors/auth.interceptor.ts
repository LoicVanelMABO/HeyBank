import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";

export const authIncerceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService)
    const token = authService.getToken();

    //Ajouter le token d'authentification aux requêtes sortantes
    if (token) {
        req = req.clone({
           setHeaders: {
            Authorization: `Bearer ${token}`
           }
        });
    }
    return next(req);
}