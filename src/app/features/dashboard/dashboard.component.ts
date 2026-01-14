import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { DashboardService } from '../../core/services/dashboard/dashboard.service';
import { DashboardStats } from '../../core/models/dashboard/DashboardStats';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, QuickActionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    accountsCount: 0,
    pendingTransactions: 0,
    totalBalance: 0,
    cashback: 0
  };

  isLoading: boolean = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.error = null;

    // Utiliser getDashboardStats() pour une version simple et rapide
    // Ou getDetailedDashboardStats() pour inclure les transactions en attente
    this.dashboardService.getDetailedDashboardStats().subscribe({
      next: (stats: DashboardStats) => {
        this.stats = stats;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du dashboard:', err);
        this.error = 'Impossible de charger les données du dashboard';
        this.isLoading = false;
      }
    });
  }

  refreshData() {
    this.loadDashboardData();
  }
}
