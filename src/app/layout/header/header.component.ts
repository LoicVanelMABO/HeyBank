import { AuthService } from './../../core/services/auth/auth.service';
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isMenuOpen = false;
    isLoginedIn = signal(false);
    _router!: Router;
    private authService: AuthService;

    constructor(authService: AuthService, router: Router) {
        this.authService = authService;
        this.isLoginedIn.set(authService.isLoggedIn());
        this._router = router;

        // Mettre à jour l'état de connexion à chaque changement de route
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.isLoginedIn.set(this.authService.isLoggedIn());
        });
    }

    OnInit() {
        this.isLoginedIn.set(this.authService.isLoggedIn());
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
    navigateToProfile() {
        this._router.navigate(['/profile']);
    }


isActiveUrl(route: string): boolean {
  return this._router.url === route;
}

}
