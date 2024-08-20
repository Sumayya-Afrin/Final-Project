import { Component } from '@angular/core';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { CraftsComponent } from '../crafts/crafts.component';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of, startWith } from 'rxjs';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-craft-list',
  standalone: true,
  imports: [CraftsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './craft-list.component.html',
  styleUrl: './craft-list.component.scss',
})
export class CraftListComponent {
  searchCraft!: FormGroup;
  crafts: any = [];
  craftList: Array<ICraft> = [];
  isLoading: boolean = true;
  msg = '';
  // $craft: any;

  constructor(
    public craftService: CraftService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchCraft = this.fb.group({
      search: '',
    });
  }

  ngOnInit() {
    this.loadCrafts();

    this.searchCraft
      .get('search')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((searchTerm) =>
          this.craftService.searchCraft(searchTerm).pipe(
            catchError((error) => {
              console.log(error);
              return of([]);
            })
          )
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.crafts = data;
      });
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
