import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ICraft } from '../app.component';
import { CraftService } from '../craft.service';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIcon, MatCard, CurrencyPipe, MatIcon, MatButton, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: Array<{ craft: ICraft; quantity: number }> = [];
  total: number = 0;

  constructor(
    private craftservice: CraftService,
    private route: ActivatedRoute, // DI
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  openConfirmDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message },
    });
    return dialogRef.afterClosed().toPromise();
  }

  ngOnInit() {
    this.cartItems = this.craftservice.getCartItems();
    console.log(this.cartItems);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (acc, item) => acc + Number(item.craft.price) * Number(item.quantity),
      0
    );
  }

  async removeItem(craftId: number) {
    this.craftservice.removeItem(craftId);
    const status = await this.openConfirmDialog(
      'Are you sure you want to remove the item from cart?'
    );

    if (status) {
      this.showSnackBar('Craft removed from cart!', 'Close');

      this.cartItems = this.craftservice.getCartItems();
      this.calculateTotal();
    }
  }

  showSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
