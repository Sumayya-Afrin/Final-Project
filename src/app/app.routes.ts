import { Routes } from '@angular/router';

import { CraftsComponent } from './crafts/crafts.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CraftListComponent } from './craft-list/craft-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'Crafts',
    // component: MovieListComponent,
    children: [
      {
        path: '',
        component: CraftListComponent,
      },
    ],
  },
];
