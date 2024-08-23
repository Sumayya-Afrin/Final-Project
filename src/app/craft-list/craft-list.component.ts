import { Component } from '@angular/core';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { CraftsComponent } from '../crafts/crafts.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, catchError, of, startWith } from 'rxjs';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-craft-list',
  standalone: true,
  imports: [
    CraftsComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    ConfirmDialogComponent,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './craft-list.component.html',
  styleUrl: './craft-list.component.scss',
})
export class CraftListComponent {
  searchCraft!: FormGroup;
  // crafts: any = [];
  craftList: any = [];
  isLoading: boolean = true;
  msg = '';
  selectedCategory: string = '';
  dropdownOpen: boolean = false;
  // $craft: any;

  constructor(
    public craftService: CraftService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
        console.log('search function...');
        console.log(data);
        this.craftList = data;
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
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }

  openConfirmDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message },
    });

    return dialogRef.afterClosed().toPromise();
  }

  showSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  addOneProduct(item: ICraft) {
    return this.craftService.addCraftP(item);
  }

  async deleteCraftP(craft: ICraft) {
    const confirmed = await this.openConfirmDialog(
      'Are you sure you want to delete this craft?'
    );
    if (confirmed) {
      console.log('deleting...');
      this.craftService.deleteCraftById(craft).then(() => {
        this.loadCrafts();
        this.showSnackBar('Craft deleted successfully!');
      });
    }
  }

  async editCraftP(craft: ICraft) {
    const confirmed = await this.openConfirmDialog(
      'Are you sure you want to edit this craft?'
    );
    if (confirmed) {
      console.log('navigating....');
      this.router.navigate(['Crafts', 'edit', craft.craftId]);
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  applyFilter(category: string) {
    this.selectedCategory = category;
    this.dropdownOpen = false;
    this.searchCraft.get('search')?.updateValueAndValidity(); // Trigger search
  }
}
