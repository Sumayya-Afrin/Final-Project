import { Component } from '@angular/core';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { CraftsComponent } from '../crafts/crafts.component';
import { SearchCraftComponent } from '../search-craft/search-craft.component';
import { Router } from '@angular/router';

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
  $craft: any;

  constructor(public craftService: CraftService, private router: Router) {}

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

  deleteCraftP(craft: ICraft) {
    console.log('deleting...');
    this.craftService.deleteCraftById(craft).then(() => this.loadCrafts());
  }

  editCraftP(craft: ICraft) {
    console.log('navigating....');
    this.router.navigate(['Crafts', 'edit', craft.id]);
  }
}
