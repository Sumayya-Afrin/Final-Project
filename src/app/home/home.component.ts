import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
