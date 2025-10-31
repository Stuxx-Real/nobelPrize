import { Routes } from '@angular/router';
import { PrizeListComponent } from './prize-list/prize-list';
import { LaureateDetailComponent } from './laureate-dialog/laureate-dialog';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: PrizeListComponent },
  { path: 'laureate/:id', component: LaureateDetailComponent },
  { path: '**', component: NotFound } // Wildcard route
];
