import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { NewCraft } from '../../../craft';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  craftList: Array<ICraft> = [];
  craftsForm!: FormGroup;

  constructor(
    public craftService: CraftService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // this.craftList = this.craftService.getAllCrafts(cr);

    // formGroup -> formControlName
    this.craftsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

  openConfirmDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message },
    });

    return dialogRef.afterClosed().toPromise();
  }
  async addCraft() {
    if (this.craftsForm.valid) {
      const confirmed = await this.openConfirmDialog(
        'Are you sure you want to add this craft?'
      );
      if (confirmed) {
        let newCraft: NewCraft = this.craftsForm.value;
        this.craftService
          .addCraftSer(newCraft)
          .then(() => {
            this.showSnackBar('Craft added successfully!', 'Close');
            this.router.navigate(['Crafts']);
          })
          .catch(() => {
            this.showSnackBar('Failed to add the craft.', 'Close'); // Error message
          });
      }
    }
  }

  showSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  get title() {
    return this.craftsForm.get('title');
  }

  get description() {
    return this.craftsForm.get('description');
  }

  get category() {
    return this.craftsForm.get('category');
  }

  get price() {
    return this.craftsForm.get('price');
  }

  get imageUrl() {
    return this.craftsForm.get('imageUrl');
  }
}
