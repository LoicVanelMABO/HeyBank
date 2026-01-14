import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, QuickActionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats = {
    accountsCount: 0,
    pendingTransactions: 0,
    totalBalance: 0,
    cashback: 0
  };

  ngOnInit() {
    // TODO: Récupérer les vraies données via un service
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Données mockées pour l'instant
    this.stats = {
      accountsCount: 3,
      pendingTransactions: 2,
      totalBalance: 12450.75,
      cashback: 45.20
    };
  }
}
