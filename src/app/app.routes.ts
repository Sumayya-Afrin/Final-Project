import { Routes } from '@angular/router';

import { CraftsComponent } from './crafts/crafts.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CraftListComponent } from './craft-list/craft-list.component';
import { CraftDetailsComponent } from './craft-details/craft-details.component';
import { AddComponent } from './add/add.component';
import { EditCraftComponent } from './edit-craft/edit-craft.component';
import { LoginComponent } from './login/login.component';
import { SearchCraftComponent } from './search-craft/search-craft.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'Crafts',
    children: [
      {
        path: '',
        component: CraftListComponent,
      },
      {
        path: 'search',
        component: SearchCraftComponent,
      },

      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'edit/:id',
        component: EditCraftComponent,
      },
      {
        path: ':id',
        component: CraftDetailsComponent,
      },
    ],
  },
];
