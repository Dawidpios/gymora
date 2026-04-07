import { Component, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatProgressBarModule, MatCardModule, MatChipsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  features = input([
    {
      id: 1,
      title: 'Personalized Workout Plans',
      description:
        'Create workout plans tailored to your fitness level, goals, and preferences.',
      src: 'images/home/personalWorkout.jpg',
    },
    {
      id: 2,
      title: 'BMI and calories recommendations',
      description:
        'Get personalized BMI and calorie recommendations based on your fitness goals.',
      src: 'images/home/calculator.jpg',
    },
  ]);
}
