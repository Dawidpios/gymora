import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HolidayService } from '../holiday-service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-transport',
  imports: [MatExpansionModule, TitleCasePipe],
  templateUrl: './transport.html',
  styleUrl: './transport.scss',
})
export class Transport {
  holidayService = inject(HolidayService);
  transportAirport = this.holidayService?.details()?.airport_transport;
  publicTransport = this.holidayService?.details()?.public_transport;
  ticketsCost = this.holidayService?.details()?.public_transport.available_modes
}
