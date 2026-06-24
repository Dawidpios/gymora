import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HolidayService } from '../holiday-service';

@Component({
  selector: 'app-info-board',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './info-board.html',
  styleUrl: './info-board.scss',
})
export class InfoBoard {
  holidayService = inject(HolidayService);
  details = this.holidayService.details;
}
