import { HttpClient } from '@angular/common/http';
import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfoBoard } from './info-board/info-board';
import { HolidayService } from './holiday-service';
import response from '../../../../response.json';

@Component({
  selector: 'app-holiday-planner',
  imports: [FormsModule, InfoBoard],
  templateUrl: './holiday-planner.html',
  styleUrl: './holiday-planner.scss',
})
export class HolidayPlanner {
  http = inject(HttpClient);
  holidayService = inject(HolidayService);
  inputValue = signal('');
  isInputEmpty = computed(() => this.inputValue().trim() === '');
  result = this.holidayService.details;
  pending = signal(false);

  search(value: string) {
    this.pending.set(true);

    setTimeout(() => {
      this.holidayService.setResult(response);
      this.pending.set(false);
    }, 1300);
    // this.http
    //   .post('http://127.0.0.1:8000/holiday-planner', { value })
    //   .subscribe({
    //     next: (res: any) => this.holidayService.setResult(response),
    //     error: (err: any) => {
    //       throw new Error(err?.message);
    //     },
    //     complete: () => this.pending.set(false),
    //   });
  }
}
