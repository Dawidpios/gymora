import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanCreatorComponent } from './plan-creator/plan-creator.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'creator', component: PlanCreatorComponent },
  { path: 'user', component: UserComponent }
];
