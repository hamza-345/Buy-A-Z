import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-menu',
  templateUrl: './product-list-menu.component.html',
  styleUrls: ['./product-list-menu.component.css']
})
export class ProductListMenuComponent implements OnInit {

  productCategories: ProductCategory[] = []
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }
  getProductCategories() {
    this.productService.getProductCategories().subscribe(data => {
      console.log(data)
      this.productCategories = data;
    })
  }

}
