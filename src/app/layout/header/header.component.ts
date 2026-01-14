import { AuthService } from './../../core/services/auth/auth.service';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

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

    constructor(authService: AuthService) {
        this.isLoginedIn.set(authService.isLoggedIn());
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
}
