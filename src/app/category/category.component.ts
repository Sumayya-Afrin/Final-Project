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
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categoryName: string | null = '';
  crafts: ICraft[] = [];

  constructor(
    private route: ActivatedRoute,
    private craftService: CraftService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryName = params.get('categoryName');
      if (this.categoryName) {
        this.loadCraftsByCategory(this.categoryName);
      }
    });
  }

  loadCraftsByCategory(category: string): void {
    this.craftService.searchCraft(category).subscribe((crafts: any) => {
      this.crafts = crafts;
    });
  }
}
