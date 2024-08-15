import { Routes } from '@angular/router';

import { CraftsComponent } from './crafts/crafts.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CraftListComponent } from './craft-list/craft-list.component';
import { CraftDetailsComponent } from './craft-details/craft-details.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'Crafts',
    children: [
      {
        path: '',
        component: CraftListComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: ':id',
        component: CraftDetailsComponent,
      },
    ],
  },
];
