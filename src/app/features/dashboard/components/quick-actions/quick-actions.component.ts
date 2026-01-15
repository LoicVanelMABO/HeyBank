import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.css'
})
export class QuickActionsComponent {

  _router!: Router;

  constructor(Router: Router) {
    this._router = Router;
  }

  actions: QuickAction[] = [
    {
      id: 'accounts',
      title: 'Comptes',
      icon: '🏦',
      description: 'Voir tous mes comptes',
      color: '#2563eb'
    },
    {
      id: 'wero',
      title: 'Wero',
      icon: '💸',
      description: 'Paiement instantané',
      color: '#667eea'
    },
    {
      id: 'rib',
      title: 'RIB',
      icon: '📄',
      description: 'Afficher mon RIB',
      color: '#008755'
    },
    {
      id: 'pub',
      title: 'Publicités',
      icon: '📢',
      description: 'Offres spéciales',
      color: '#f59e0b'
    },
    {
      id: 'virement',
      title: 'Virement',
      icon: '💳',
      description: 'Effectuer un virement',
      color: '#10b981'
    },
    {
      id: 'cheque',
      title: 'Chèque',
      icon: '✍️',
      description: 'Commander un chéquier',
      color: '#3b82f6'
    },
    {
      id: 'carte',
      title: 'Carte',
      icon: '💳',
      description: 'Gérer mes cartes',
      color: '#8b5cf6'
    }
  ];

  onActionClick(action: QuickAction) {
    console.log('Action cliquée:', action.title);
    // TODO: Implémenter la navigation ou l'action
    switch (action.id) {
      case 'accounts':
        this._router.navigate(['/accounts']);
        break;
      case 'wero':
        alert('Fonction Wero en cours de développement.');
        break;

      case 'rib':
        alert('Affichage du RIB en cours de développement.');
        break;

      case 'pub':
        alert('Nous vous invitons à visiter nos offres spéciales sur notre site.');
        break;

      case 'virement':
        this._router.navigate(['/transactions']);
        break;

      case 'cheque':
        alert("Vous n'avez pas encore de chéquier associé à votre compte. Nous vous invitons à contacter votre conseiller pour plus d'informations.");
        break;

      case 'carte':
        alert('Votre carte est en cours de création. Vous serez notifié dès qu\'elle sera prête et elle vous sera envoyée à domicile.');
        break;

    }
  }
}
