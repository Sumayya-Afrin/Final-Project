import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of } from 'rxjs';

import { SerachService } from '../serach.service';

@Component({
  selector: 'app-search-craft',
  standalone: true,
  imports: [ReactiveFormsModule],
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
