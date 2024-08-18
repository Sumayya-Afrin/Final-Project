import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of } from 'rxjs';

import { SerachService } from '../serach.service';
import { CraftListComponent } from '../craft-list/craft-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { CraftsComponent } from '../crafts/crafts.component';
import { ICraft } from '../app.component';

@Component({
  selector: 'app-search-craft',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CraftListComponent,
    MatBadgeModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    CraftsComponent,
  ],
  templateUrl: './search-craft.component.html',
  styleUrl: './search-craft.component.scss',
})
export class SearchCraftComponent {
  searchCraft!: FormGroup;
  crafts: any;
  constructor(private craftService: SerachService, private fb: FormBuilder) {
    this.searchCraft = this.fb.group({
      search: '',
    });
  }

  show = true;
  showDescription1() {
    this.show = this.show ? false : true;
  }

  ngOnInit() {
    this.searchCraft
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((searchTerm) => this.craftService.searchCraft(searchTerm))
      )
      .subscribe((data) => {
        console.log(data);
        this.crafts = data;
      });
  }
}
