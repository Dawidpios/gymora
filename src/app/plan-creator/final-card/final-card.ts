import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { WorkoutPlan } from '../plantypes';

export type { WorkoutPlan };

@Component({
  selector: 'app-final-card',
  imports: [CommonModule],
  templateUrl: './final-card.html',
  styleUrl: './final-card.scss',
})
export class FinalCard {
  result = input<WorkoutPlan | null>(null);
}
