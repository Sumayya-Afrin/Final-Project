import { Component } from '@angular/core';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { CraftsComponent } from '../crafts/crafts.component';
import { SearchCraftComponent } from '../search-craft/search-craft.component';

@Component({
  selector: 'app-craft-list',
  standalone: true,
  imports: [CraftsComponent, SearchCraftComponent],
  templateUrl: './craft-list.component.html',
  styleUrl: './craft-list.component.scss',
})
export class CraftListComponent {
  craftList: Array<ICraft> = [];
  isLoading: boolean = true;
  msg = '';

  constructor(public craftService: CraftService) {}

  ngOnInit() {
    this.loadCrafts();
  }

  loadCrafts() {
    console.log('loading data..');
    this.craftService
      .getAllCrafts()
      .then((data) => {
        this.craftList = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }
}
