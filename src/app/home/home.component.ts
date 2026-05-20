import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectCarouselComponent } from './project-carousel/project-carousel.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    ProjectCarouselComponent,
    TechStackComponent,
    Contact,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
