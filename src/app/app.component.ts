import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CraftsComponent } from './crafts/crafts.component';
import { CraftListComponent } from './craft-list/craft-list.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginServiceService } from './login-service.service';

export interface ICraft {
  title: string;
  description: string;
  category: string;
  price: any;
  imageUrl: string;
  craftId: number;
  StockQuantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CraftsComponent,
    PieChartComponent,
    MatButtonModule,
    MatCardModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crafts-project';
  // loginSuccess: boolean = false;
  constructor(public loginservice: LoginServiceService) {
    if (localStorage.getItem('username')) {
      this.loginservice.loginSuccess = true;
      console.log(this.loginservice.loginSuccess);
      console.log('user is logged in.');
    }
  }
  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.loginservice.loginSuccess = true;
      console.log(this.loginservice.loginSuccess);
      console.log('user is logged in.');
    }
  }

  logout() {
    // console.log('logout..');
    localStorage.clear();
    this.loginservice.loginSuccess = false;
  }
}
