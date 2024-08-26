import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crafts',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    RouterLink,
  ],
  templateUrl: './crafts.component.html',
  styleUrl: './crafts.component.scss',
})
export class CraftsComponent {
  like = 0;
  // @Input() craft1 = {
  //   title: 'Artisan Wooden Bowl',
  //   description:
  //     'Handcrafted wooden bowl made from reclaimed oak, featuring intricate carvings and a smooth finish.',
  //   category: 'Pottery',
  //   price: 45,
  //   imageUrl:
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2JMw0JXHH0whN8cSkfZ9UFBolQFGEcQ-2UQ&s',
  // };

  @Input() craft!: ICraft;
  @Output() deleteCraftEvent = new EventEmitter<any>();
  @Output() updateCraftEvent = new EventEmitter<any>();
  @Output() addItemEvent: EventEmitter<ICraft> = new EventEmitter<ICraft>();

  @Input() roleId: any;

  isLoading: boolean = true;
  msg = '';

  show = true;

  constructor(
    public craftservice: CraftService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    console.log(this.roleId);
  }

  deleteCraft() {
    console.log('Button clicked...');
    this.deleteCraftEvent.emit(this.craft);
  }
  showDescription() {
    this.show = this.show ? false : true;
  }

  editCraft() {
    console.log('edit');
    this.updateCraftEvent.emit(this.craft);
  }

  addToCart() {
    console.log('Item Clicked');
    this.craftservice.addCraftP(this.craft);
  }

  likeIncrement() {
    console.log('like');
    this.like = this.like + 1;
  }
}
