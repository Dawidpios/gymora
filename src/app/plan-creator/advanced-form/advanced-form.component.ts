import { Component, signal, output } from '@angular/core';

@Component({
  selector: 'app-advanced-form',
  standalone: true,
  imports: [],
  templateUrl: './advanced-form.component.html',
  styleUrl: './advanced-form.component.scss',
})
export class AdvancedFormComponent {
  exercises = signal([
    { name: 'Squats', value: 'squats', id: 1 },
    { name: 'Push-ups', value: 'push-ups', id: 2 },
    { name: 'Lunges', value: 'lunges', id: 3 },
    { name: 'Planks', value: 'planks', id: 4 },
    { name: 'Burpees', value: 'burpees', id: 5 },
    { name: 'Deadlifts', value: 'deadlifts', id: 6 },
    { name: 'Bench Press', value: 'bench-press', id: 7 },
    { name: 'Pull-ups', value: 'pull-ups', id: 8 },
    { name: 'Rows', value: 'rows', id: 9 },
    { name: 'Overhead Press', value: 'overhead-press', id: 10 },
  ]);

  close = output<void>();

  hideAdvancedForm() {
    this.close.emit();
  }
}
