import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-creator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './plan-creator.component.html',
  styleUrl: './plan-creator.component.scss',
})
export class PlanCreatorComponent {
  showAdvancedForm = signal(false);

  // Form groups for each step
  basicInfoForm!: FormGroup;
  exercisesForm!: FormGroup;
  planPreviewForm!: FormGroup;
  summaryForm!: FormGroup;

  // Available exercises list
  exercises = [
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
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForms();
  }

  private initializeForms(): void {
    // Step 1: Basic Information
    this.basicInfoForm = this.fb.group({
      goal: ['', Validators.required],
      experience: ['', Validators.required],
      days: ['', Validators.required],
    });

    // Step 2: Exercise Selection
    this.exercisesForm = this.fb.group(
      {
        squats: [false],
        pushUps: [false],
        lunges: [false],
        planks: [false],
        burpees: [false],
        deadlifts: [false],
        benchPress: [false],
        pullUps: [false],
        rows: [false],
        overheadPress: [false],
      },
      { validators: this.atLeastOneExerciseSelected },
    );

    // Step 3: Plan Preview with customizable options
    this.planPreviewForm = this.fb.group({
      weeklyStructure: ['', Validators.required],
      trainingApproach: ['', Validators.required],
    });

    // Step 4: Summary (no form controls, just review)
    this.summaryForm = this.fb.group({});
  }

  // Custom validator to ensure at least one exercise is selected
  private atLeastOneExerciseSelected(
    group: FormGroup,
  ): { [key: string]: boolean } | null {
    const hasAtLeastOne = Object.keys(group.controls).some(
      (key) => group.controls[key].value === true,
    );
    return hasAtLeastOne ? null : { noExerciseSelected: true };
  }

  getSelectedExercises(): string[] {
    const selected: string[] = [];
    const controls = this.exercisesForm.controls;

    if (controls['squats'].value) selected.push('Squats');
    if (controls['pushUps'].value) selected.push('Push-ups');
    if (controls['lunges'].value) selected.push('Lunges');
    if (controls['planks'].value) selected.push('Planks');
    if (controls['burpees'].value) selected.push('Burpees');
    if (controls['deadlifts'].value) selected.push('Deadlifts');
    if (controls['benchPress'].value) selected.push('Bench Press');
    if (controls['pullUps'].value) selected.push('Pull-ups');
    if (controls['rows'].value) selected.push('Rows');
    if (controls['overheadPress'].value) selected.push('Overhead Press');

    return selected;
  }

  getPlanData() {
    return {
      goal: this.basicInfoForm.value.goal,
      experience: this.basicInfoForm.value.experience,
      days: this.basicInfoForm.value.days,
      exercises: this.getSelectedExercises(),
      weeklyStructure: this.planPreviewForm.value.weeklyStructure,
      trainingApproach: this.planPreviewForm.value.trainingApproach,
    };
  }

  getWeeklyStructureOptions(): { value: string; label: string }[] {
    const days = parseInt(this.basicInfoForm.value.days || '0');
    const options = [
      { value: 'fbw', label: 'FBW (Full Body Workout)' },
      { value: 'split', label: 'Split (Muscle Group Split)' },
      { value: 'ppl', label: 'PPL (Push Pull Legs)' },
      { value: 'upper-lower', label: 'Upper/Lower Split' },
      { value: 'upper-lower-full', label: 'Upper/Lower/Full Body' },
    ];

    // Filter based on days - some splits require minimum days
    if (days === 2) {
      return options.filter((opt) =>
        ['fbw', 'upper-lower'].includes(opt.value),
      );
    } else if (days === 3) {
      return options.filter((opt) =>
        ['fbw', 'ppl', 'upper-lower-full'].includes(opt.value),
      );
    }
    return options;
  }

  getTrainingApproachOptions(): { value: string; label: string }[] {
    return [
      { value: 'traditional', label: 'Traditional (3-4 sets, 8-12 reps)' },
      { value: 'strength', label: 'Strength Focus (5x5, heavy weights)' },
      { value: 'hypertrophy', label: 'Hypertrophy (4 sets, 10-15 reps)' },
      { value: 'circuit', label: 'Circuit Training (minimal rest)' },
      { value: 'hiit', label: 'HIIT (High Intensity Intervals)' },
      { value: 'pyramid', label: 'Pyramid Sets (progressive weight)' },
    ];
  }

  getWeeklyStructureLabel(): string {
    const value = this.planPreviewForm.value.weeklyStructure;
    const option = this.getWeeklyStructureOptions().find(
      (opt) => opt.value === value,
    );
    return option?.label || 'Not selected';
  }

  getTrainingApproachLabel(): string {
    const value = this.planPreviewForm.value.trainingApproach;
    const option = this.getTrainingApproachOptions().find(
      (opt) => opt.value === value,
    );
    return option?.label || 'Not selected';
  }

  toggleAdvancedForm() {
    this.showAdvancedForm.update((value) => !value);
  }

  onSubmit(): void {
    if (
      this.basicInfoForm.valid &&
      this.exercisesForm.valid &&
      this.planPreviewForm.valid
    ) {
      const formData = {
        basicInfo: this.basicInfoForm.value,
        exercises: this.getSelectedExercises(),
        planDetails: this.planPreviewForm.value,
      };
      console.log('Form submitted:', formData);
      // TODO: Add service call to save plan to backend
    }
  }
}
