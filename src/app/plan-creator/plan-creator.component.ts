import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { FinalCard } from './final-card/final-card';
import { WorkoutPlan } from './plantypes';

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
    MatCheckboxModule,
    FinalCard,
  ],
  templateUrl: './plan-creator.component.html',
  styleUrl: './plan-creator.component.scss',
})
export class PlanCreatorComponent {
  showAdvancedForm = signal(false);
  result = signal<null | WorkoutPlan>(null);
  basicInfoForm!: FormGroup;
  exercisesForm!: FormGroup;
  planPreviewForm!: FormGroup;
  summaryForm!: FormGroup;

  http = inject(HttpClient);
  toast = inject(MessageService);
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

  pending = signal(false);

  constructor(private fb: FormBuilder) {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.basicInfoForm = this.fb.group({
      goal: ['', Validators.required],
      experience: ['', Validators.required],
      days: ['', Validators.required],
    });
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

    this.planPreviewForm = this.fb.group({
      weeklyStructure: ['', Validators.required],
      trainingApproach: ['', Validators.required],
    });

    this.summaryForm = this.fb.group({});
  }

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
      this.pending() ||
      !this.basicInfoForm.valid ||
      !this.exercisesForm.valid ||
      !this.planPreviewForm.valid
    ) {
      return;
    }

    const formData = {
      basicInfo: this.basicInfoForm.value,
      exercises: this.getSelectedExercises(),
      planDetails: this.planPreviewForm.value,
    };

    this.pending.set(true);
    this.http
      .post<WorkoutPlan>('http://127.0.0.1:8000/plan-creator', formData)
      .pipe(finalize(() => this.pending.set(false)))
      .subscribe({
        next: (response) => {
          this.result.set(response);
          this.toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Plan sent successfully',
          });
        },
        error: (error) => {
          console.error('Error sending plan data:', error);
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to send plan',
          });
        },
      });
  }
}
