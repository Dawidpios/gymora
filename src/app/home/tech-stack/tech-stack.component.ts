import { Component } from '@angular/core';

interface TechItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  techItems: TechItem[] = [
    { name: 'HTML', image: '/images/stack-icons/icons8-html-96.png' },
    {
      name: 'JavaScript',
      image: '/images/stack-icons/icons8-javascript-96.png',
    },
    {
      name: 'TypeScript',
      image: '/images/stack-icons/icons8-typescript-96.png',
    },
    { name: 'React', image: '/images/stack-icons/icons8-react-100.png' },
    { name: 'Next.js', image: '/images/stack-icons/icons8-next.js-96.png' },
    { name: 'Redux', image: '/images/stack-icons/icons8-redux-96.png' },
    {
      name: 'Zustand',
      image: '/images/stack-icons/zustand-original-128px.png',
    },
    {
      name: 'Tailwind CSS',
      image: '/images/stack-icons/icons8-tailwind-css-96.png',
    },
    { name: 'Node.js', image: '/images/stack-icons/icons8-node-js-96.png' },
    { name: 'MongoDB', image: '/images/stack-icons/icons8-mongodb-96.png' },
    {
      name: 'Prisma ORM',
      image: '/images/stack-icons/icons8-prisma-orm-96.png',
    },
    { name: 'Python', image: '/images/stack-icons/icons8-python-96.png' },
    { name: 'GitHub', image: '/images/stack-icons/icons8-github-96.png' },
  ];

  get doubledItems(): TechItem[] {
    return [...this.techItems, ...this.techItems];
  }
}
