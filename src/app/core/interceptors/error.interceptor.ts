// core/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Token expiré ou invalide
        router.navigate(['/login']); // Déconnexion auto
      }
      if (error.status === 500) {
        // Erreur serveur
        alert('Erreur serveur, réessayez plus tard');
      }
      return throwError(() => error);
    })
  );
};