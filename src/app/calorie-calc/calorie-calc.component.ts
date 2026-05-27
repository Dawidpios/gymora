import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-calorie-calc',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './calorie-calc.component.html',
  styleUrl: './calorie-calc.component.scss',
})
export class CalorieCalcComponent {
  form = new FormGroup({
    sex: new FormControl({}),
    age: new FormControl({}),
    weight: new FormControl({}),
    height: new FormControl({}),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
