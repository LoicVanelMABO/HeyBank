import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/auth/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

    copyToClipboard(valueToCopy: string) {
  navigator.clipboard.writeText(valueToCopy).then(() => {
    alert('Copié : '+valueToCopy);
  }).catch(() => {
    console.error('Erreur lors de la copie');
  });
}

  loadUserProfile() {
    this.isLoading = true;
    this.error = null;

    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isLoggedIn()) {
      console.log('Utilisateur non connecté, redirection vers login');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Chargement du profil utilisateur...');
    
    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        console.log('Profil chargé:', user);
        this.user = user;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
        this.error = 'Impossible de charger votre profil';
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
