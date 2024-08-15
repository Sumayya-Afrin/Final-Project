import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';

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

  isLoading: boolean = true;
  msg = '';

  show = true;
  editCraft() {
    throw new Error('Method not implemented.');
  }
  deleteCraft() {
    console.log('Button clicked...');
    this.deleteCraftEvent.emit(this.craft);
  }
  showDescription() {
    this.show = this.show ? false : true;
  }
}
