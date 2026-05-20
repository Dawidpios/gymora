import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'primeng/carousel';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-project-carousel',
  standalone: true,
  imports: [MatCardModule, CarouselModule],
  templateUrl: './project-carousel.component.html',
  styleUrl: './project-carousel.component.scss',
})
export class ProjectCarouselComponent {
  projects: Project[] = [
    {
      title: 'GYR – Recipe & Fridge Manager',
      description:
        'A full-stack web app for managing recipes, shopping lists, and fridge inventory. ' +
        'Users can browse and create recipes, build smart shopping lists from ingredients, ' +
        'and track what is in their fridge – with automatic cross-referencing between the two.',
      techStack: [
        'Next.js 15',
        'React 19',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'NextAuth.js',
        'Tailwind CSS',
        'Radix UI',
        'Zod',
      ],
      githubUrl: 'https://github.com',
    },
    {
      title: 'Gymora – Fitness Portfolio',
      description:
        'This very application – a personal fitness & portfolio platform built with Angular 19 and server-side rendering. ' +
        'Features a holiday workout planner, calorie calculator, AI-powered fitness helper, and a customisable training plan creator.',
      techStack: [
        'Angular 19',
        'Angular SSR',
        'PrimeNG',
        'Angular Material',
        'TypeScript',
        'SCSS',
      ],
      githubUrl: 'https://github.com',
    },
  ];

  get projectsToShow(): Project[] {
    return this.projects;
  }
}
