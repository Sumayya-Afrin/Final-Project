import { Routes } from '@angular/router';
import { CraftsComponent } from './crafts/crafts.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CraftListComponent } from './craft-list/craft-list.component';
import { CraftDetailsComponent } from './craft-details/craft-details.component';
import { AddComponent } from './add/add.component';
import { EditCraftComponent } from './edit-craft/edit-craft.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CategoryComponent } from './category/category.component';
import { CourseComponent } from './course/course.component';
import { CartComponent } from './cart/cart.component';
// import { authGuard } from '../../auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'loginUser', component: LoginComponent },

  { path: 'logout', component: HomeComponent },

  { path: 'signup', component: SignUpComponent },

  { path: 'courses', component: CourseComponent },

  { path: 'cart', component: CartComponent },

  {
    path: 'Crafts',
    children: [
      {
        path: '',
        component: CraftListComponent,
        // canActivate: [authGuard],
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
