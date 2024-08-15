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
    private fb: FormBuilder
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

  addCraft() {
    if (this.craftsForm.valid) {
      let newCraft: NewCraft = this.craftsForm.value;
      this.craftService.addCraftSer(newCraft).then(() => {
        this.router.navigate(['Crafts']);
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
