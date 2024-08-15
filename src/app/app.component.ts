import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CraftsComponent } from './crafts/crafts.component';
import { CraftListComponent } from './craft-list/craft-list.component';

export interface ICraft {
  title: string;
  description: string;
  category: string;
  price: string;
  imageUrl: string;
  id: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CraftsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crafts-project';
}
