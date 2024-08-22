import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddComponent, MatCard, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
