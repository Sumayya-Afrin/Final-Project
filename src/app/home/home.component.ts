import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddComponent, MatCard, MatButton, RouterLink, CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  browseCategory() {
    this.snackBar.open('Please signup/Login to continue', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
