import { HttpClient } from '@angular/common/http';
import { Component, signal, computed, inject } from '@angular/core';
import {
  form,
  required,
  minLength,
  FormField,
  submit,
} from '@angular/forms/signals';
import { InfoBoard } from './info-board/info-board';
import { HolidayService } from './holiday-service';

@Component({
  selector: 'app-holiday-planner',
  imports: [InfoBoard, FormField],
  templateUrl: './holiday-planner.html',
  styleUrl: './holiday-planner.scss',
})
export class HolidayPlanner {
  http = inject(HttpClient);
  holidayService = inject(HolidayService);
  formModel = signal({
    city: '',
    attractionsLength: '5',
    advancedTransport: false,
  });
  form = form(this.formModel, (schemaPath) => {
    required(schemaPath.city, { message: 'City is required' });
    minLength(schemaPath.city, 3, {
      message: 'City must be at least 3 characters long',
    });
  });

  inputValue = signal('');
  isInputEmpty = computed(() => this.inputValue().trim() === '');
  result = this.holidayService.details;
  pending = signal(false);

  async onSubmit() {
    await submit(this.form, async (form) => {
      const value = form().value();
      await new Promise((resolve, reject) =>
        this.http
          .post('http://127.0.0.1:8000/holiday-planner', { value })
          .subscribe({
            next: (res: any) => this.holidayService.setResult(res),
            error: (err: any) => {
              throw new Error(err?.message);
            },
            complete: () => this.pending.set(false),
          }),
      );
    });
  }
}
