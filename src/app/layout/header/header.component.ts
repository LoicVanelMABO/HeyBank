import { AuthService } from './../../core/services/auth/auth.service';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

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

    constructor(authService: AuthService, router: Router) {
        this.isLoginedIn.set(authService.isLoggedIn());
        this._router = router;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
    navigateToProfile() {
        this._router.navigate(['/profile']);
    }

    // ...existing code...

isActiveUrl(route: string): boolean {
  return this._router.url === route;
}

// ...existing code...
}
