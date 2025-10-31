import { Routes } from '@angular/router';
import { PrizeListComponent } from './prize-list/prize-list';
import { LaureateDetailComponent } from './laureate-dialog/laureate-dialog';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'prizes', pathMatch: 'full' },
  { path: 'prizes', component: PrizeListComponent },
  { path: 'laureate/:id', component: LaureateDetailComponent },
  { path: '**', component: NotFound }
];
