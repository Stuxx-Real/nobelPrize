import { Routes } from '@angular/router';
import { PrizeListComponent } from './prize-list/prize-list';
import { LaureateDetailComponent } from './laureate-dialog/laureate-dialog';

export const routes: Routes = [
  { path: '', component: PrizeListComponent },
  { path: 'laureate/:id', component: LaureateDetailComponent },
  { path: '**', redirectTo: '' }
];
