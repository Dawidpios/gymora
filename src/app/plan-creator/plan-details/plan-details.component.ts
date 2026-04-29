import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PlanData {
  goal: string;
  experience: string;
  days: string;
  exercises: string[];
  weeklyStructure?: string;
  trainingApproach?: string;
}

@Component({
  selector: 'app-plan-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.scss',
})
export class PlanDetailsComponent {
  @Input() planData?: PlanData;

  getGoalDescription(): string {
    switch (this.planData?.goal) {
      case 'weight-loss':
        return 'Focus on high-intensity cardio and compound movements with moderate weights.';
      case 'muscle-gain':
        return 'Emphasize progressive overload with heavy compound exercises and adequate rest.';
      case 'endurance':
        return 'Build stamina with circuit training and sustained moderate-intensity exercises.';
      case 'strength':
        return 'Prioritize low-rep, high-weight compound movements with longer rest periods.';
      default:
        return '';
    }
  }

  getExperienceRecommendation(): string {
    switch (this.planData?.experience) {
      case 'beginner':
        return 'Start with 2-3 sets of 10-12 reps. Focus on form and technique.';
      case 'intermediate':
        return 'Aim for 3-4 sets of 8-12 reps with progressive overload.';
      case 'advanced':
        return 'Perform 4-5 sets with varied rep ranges (6-15). Include advanced techniques.';
      default:
        return '';
    }
  }

  getWeeklyStructureLabel(): string {
    switch (this.planData?.weeklyStructure) {
      case 'fbw':
        return 'FBW (Full Body Workout)';
      case 'split':
        return 'Split (Muscle Group Split)';
      case 'ppl':
        return 'PPL (Push Pull Legs)';
      case 'upper-lower':
        return 'Upper/Lower Split';
      case 'upper-lower-full':
        return 'Upper/Lower/Full Body';
      default:
        return 'Not selected';
    }
  }

  getTrainingApproachLabel(): string {
    switch (this.planData?.trainingApproach) {
      case 'traditional':
        return 'Traditional (3-4 sets, 8-12 reps)';
      case 'strength':
        return 'Strength Focus (5x5, heavy weights)';
      case 'hypertrophy':
        return 'Hypertrophy (4 sets, 10-15 reps)';
      case 'circuit':
        return 'Circuit Training (minimal rest)';
      case 'hiit':
        return 'HIIT (High Intensity Intervals)';
      case 'pyramid':
        return 'Pyramid Sets (progressive weight)';
      default:
        return 'Not selected';
    }
  }

  getWorkoutStructure(): string[] {
    const days = parseInt(this.planData?.days || '0');
    const structure = this.planData?.weeklyStructure;

    if (!structure) {
      // Default structures if not selected
      const structures = {
        2: ['Full Body A', 'Full Body B'],
        3: ['Upper Body', 'Lower Body', 'Full Body'],
        4: ['Upper Push', 'Lower Body', 'Upper Pull', 'Core & Cardio'],
        5: ['Push', 'Pull', 'Legs', 'Upper Body', 'Core & Conditioning'],
      };
      return structures[days as keyof typeof structures] || [];
    }

    // Generate structure based on selected weekly structure
    switch (structure) {
      case 'fbw':
        return Array.from(
          { length: days },
          (_, i) => `Full Body ${String.fromCharCode(65 + i)}`,
        );
      case 'split':
        const muscleGroups = [
          'Chest & Triceps',
          'Back & Biceps',
          'Legs',
          'Shoulders & Core',
          'Arms & Abs',
        ];
        return muscleGroups.slice(0, days);
      case 'ppl':
        const pplPattern = ['Push', 'Pull', 'Legs'];
        return Array.from({ length: days }, (_, i) => pplPattern[i % 3]);
      case 'upper-lower':
        const ulPattern = ['Upper Body', 'Lower Body'];
        return Array.from({ length: days }, (_, i) => ulPattern[i % 2]);
      case 'upper-lower-full':
        return days === 3
          ? ['Upper Body', 'Lower Body', 'Full Body']
          : ['Upper Body', 'Lower Body', 'Full Body', 'Upper Body'];
      default:
        return [];
    }
  }
}
