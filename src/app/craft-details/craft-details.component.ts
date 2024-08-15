import { Component } from '@angular/core';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-craft-details',
  standalone: true,
  imports: [],
  templateUrl: './craft-details.component.html',
  styleUrl: './craft-details.component.scss',
})
export class CraftDetailsComponent {
  craft!: ICraft;
  isLoading: boolean = true;
  msg = '';

  constructor(
    private craftService: CraftService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string; // From URL

    this.craftService
      .getCraftByIdP(id)
      .then((data) => {
        this.craft = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }
}
