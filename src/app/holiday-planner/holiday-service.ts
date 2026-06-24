import { Injectable, signal, computed } from '@angular/core';
import { Result } from './types'

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private result = signal<Result | null>(null)

  details = computed(() => this.result()?.details)

  setResult(result: Result) {
    this.result.set(result)
  }
}
