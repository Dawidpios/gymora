import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { HolidayService } from '../holiday-service';

@Component({
  selector: 'app-highlights',
  imports: [MatCardModule],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss',
})
export class Highlights {
  holidayService = inject(HolidayService);
  highlights = this.holidayService?.details()?.highlights;
}

