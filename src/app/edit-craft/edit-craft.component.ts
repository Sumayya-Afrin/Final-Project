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
import { ActivatedRoute, Router } from '@angular/router';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
@Component({
  selector: 'app-edit-craft',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './edit-craft.component.html',
  styleUrl: './edit-craft.component.scss',
})
export class EditCraftComponent {
  craftList: Array<ICraft> = [];
  craftsForm!: FormGroup;
  craftId: any;
  msg: string = '';
  craft: any = [];

  constructor(
    public craftService: CraftService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // this.craftList = this.craftService.getAllCrafts(cr);

    // formGroup -> formControlName
    this.craftsForm = this.fb.group({
      id: '',
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.craftService
      .getCraftByIdP(id)
      .then((data) => {
        this.craftsForm.patchValue(data);
      })
      .catch(() => {
        this.msg = 'Something went wrong';
      });
  }

  editCrafts() {
    console.log('saving...');
    console.log(this.craftsForm.value);
    if (this.craftsForm.valid) {
      const updatedCraft: ICraft = this.craftsForm.value;
      console.log(this.craftsForm.value);

      this.craftService
        .updateCraftsInfo(updatedCraft)
        .then(() => {
          this.router.navigate(['Crafts']);
        })
        .catch((error) => {
          console.log('Update failed');
          this.msg = 'Failed to update the craft data';
        });
    }
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
