import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { HolidayService } from '../holiday-service';

@Component({
  selector: 'app-attractions',
  imports: [MatCardModule],
  templateUrl: './attractions.html',
  styleUrl: './attractions.scss',
})
export class Attractions {
  holidayService = inject(HolidayService);
  attractions = this.holidayService?.details()?.attractions;
}
