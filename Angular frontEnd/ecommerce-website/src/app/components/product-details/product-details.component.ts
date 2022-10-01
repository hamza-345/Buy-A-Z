import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart-service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product

  constructor(public productService: ProductService, public route: ActivatedRoute, public cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProduct()
    })
  }
  listProduct() {
    let id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    })
  }

  addToCart() {
    const cartItem = new CartItem(this.product!)
    this.cartService.addProduct(cartItem)

  }

}
