import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-project-carousel',
  standalone: true,
  imports: [MatCardModule, CarouselModule],
  templateUrl: './project-carousel.component.html',
  styleUrl: './project-carousel.component.scss'
})
export class ProjectCarouselComponent {
  
}
