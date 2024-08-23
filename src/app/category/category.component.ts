import { Component } from '@angular/core';
import { ICraft } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { CraftService } from '../craft.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CraftsComponent } from '../crafts/crafts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    RouterLink,
    CraftsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  crafts: any;
  filteredCrafts: any[] = [];
  searchForm!: FormGroup;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private craftService: CraftService,
    private router: Router
  ) {}
}
