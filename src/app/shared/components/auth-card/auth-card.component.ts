import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.css'
})
export class AuthCardComponent {
  @Input() title: string = 'CodingBank';
}
