import { Component, computed, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalcResult } from './calc-result/calc-result';

@Component({
  selector: 'app-calorie-calc',
  standalone: true,
  imports: [ReactiveFormsModule, CalcResult],
  templateUrl: './calorie-calc.component.html',
  styleUrl: './calorie-calc.component.scss',
})
export class CalorieCalcComponent {
  form = new FormGroup({
    sex: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    weight: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
    height: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(220),
    ]),
    activity: new FormControl('', [Validators.required]),
    goal: new FormControl('', [Validators.required]),
  });
  result = signal<number>(0);
  get disabledBtn() {
    return this.form.invalid
  }

  getError(field: string) {
    const control = this.form.get(field);
    if (control && control.touched && control.invalid) {
      if (control.errors?.['required']) {
        return 'This field is required';
      }
      if (control.errors?.['min']) {
        return `Minimum value is ${control.errors['min'].min}`;
      }
      if (control.errors?.['max']) {
        return `Maximum value is ${control.errors['max'].max}`;
      }
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      const { sex, age, weight, height, activity, goal } = this.form.value;
      let bmr: number;
      if (sex === 'male') {
        bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
      } else {
        bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
      }
      let calories = bmr;
      calories *= Number(activity);
      switch (goal) {
        case 'lose':
          calories -= 500;
          break;
        case 'gain':
          calories += 500;
          break;
      }
      this.result.set(calories);
      this.form.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
