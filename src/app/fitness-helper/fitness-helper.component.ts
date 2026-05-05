import { Component, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fitness-helper',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './fitness-helper.component.html',
  styleUrl: './fitness-helper.component.scss',
})
export class FitnessHelperComponent {
  features = input([
    {
      id: 1,
      title: 'Personalized Workout Plans',
      description:
        'Create workout plans tailored to your fitness level, goals, and preferences.',
      src: 'images/home/personalWorkout.jpg',
      link: '/fitness/plan-creator',
    },
    {
      id: 2,
      title: 'BMI and calories recommendations',
      description:
        'Get personalized BMI and calorie recommendations based on your fitness goals.',
      src: 'images/home/calculator.jpg',
      link: '/fitness/calorie-calc',
    },
  ]);
}
