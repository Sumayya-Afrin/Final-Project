import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  craft: any = {};
  CartData: any = {};

  constructor(
    private cartservice: CartService,
    private route: ActivatedRoute, // DI
    private router: Router
  ) {}

  ngOnInit() {
    this.CartData = this.cartservice.gettingCart();

    console.log(this.CartData);
  }
}
