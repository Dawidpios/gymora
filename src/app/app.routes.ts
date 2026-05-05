
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HolidayPlannerComponent } from './holiday-planner/holiday-planner.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },   
  { path: 'home', component: HomeComponent },
  {
    path: 'fitness',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./fitness-helper/fitness-helper.component').then(
            (m) => m.FitnessHelperComponent,
          ),
      },
      {
        path: 'plan-creator',
        loadComponent: () =>
          import('./plan-creator/plan-creator.component').then(
            (m) => m.PlanCreatorComponent,
          ),
      },
      {
        path: 'calorie-calc',
        loadComponent: () =>
          import('./calorie-calc/calorie-calc.component').then(
            (m) => m.CalorieCalcComponent,
          ),
      },
    ],
  },
  { path: 'holiday', component: HolidayPlannerComponent },
  { path: 'user', component: UserComponent },
];
