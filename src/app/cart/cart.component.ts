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

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIcon, MatCard, CurrencyPipe, MatIcon, MatButton],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: Array<{ craft: ICraft; quantity: number }> = [];
  total: number = 0;

  constructor(
    private craftservice: CraftService,
    private route: ActivatedRoute, // DI
    private router: Router
  ) {}

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

  removeItem(craftId: number) {
    this.craftservice.removeItem(craftId);
    this.cartItems = this.craftservice.getCartItems();
    this.calculateTotal();
  }
}
