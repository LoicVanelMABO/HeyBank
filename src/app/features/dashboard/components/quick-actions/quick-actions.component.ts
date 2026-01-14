import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  actions: QuickAction[] = [
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
  }
}
