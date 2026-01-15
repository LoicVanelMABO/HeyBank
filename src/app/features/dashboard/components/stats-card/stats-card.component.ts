import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = '📊';
  @Input() color: 'primary' | 'success' | 'warning' | 'info' = 'primary';
  @Input() isCurrency: boolean = false;
  @Input() link: string = '#';

  _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  formatValue(): string {
    if (this.isCurrency) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(this.value);
    }
    return this.value.toString();
  }

  navigate(): void {
    this._router.navigateByUrl(this.link);
  }
}
