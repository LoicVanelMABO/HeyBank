import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-digit-pad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digit-pad.component.html',
  styleUrl: './digit-pad.component.css'
})
export class DigitPadComponent implements OnInit {
  @Output() digitClick = new EventEmitter<number>();
  @Output() deleteLast = new EventEmitter<void>();  
  digitButtons: (number | null)[] = [];

  ngOnInit() {
    this.shuffleDigitPad();
  }

  shuffleDigitPad() {
    // Créer un tableau avec les chiffres 0-9 et 2 emplacements vides (null)
    const digits: (number | null)[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, null, null];
    
    // Mélange aléatoire (Fisher-Yates)
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    
    this.digitButtons = digits;
  }

  onDigitClick(digit: number | null) {
    if (digit !== null) {
      this.digitClick.emit(digit);
    }
  }

  onDeleteLast() {
    this.deleteLast.emit();
  }
}
