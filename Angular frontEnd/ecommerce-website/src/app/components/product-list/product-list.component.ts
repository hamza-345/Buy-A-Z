import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart-service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = []
  keyword: string = ""
  previousKeyword: string = ""
  categoryId: number = 1;
  previousId: number = 1;
  searchMode: boolean = false;
  thePage: number = 1;
  thePageSize: number = 5;
  totalElements: number = 100;


  constructor(public productService: ProductService, public route: ActivatedRoute, public cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    }
    );

  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.keyword = this.route.snapshot.paramMap.get("keyword")!;
      if (this.previousKeyword != this.keyword) {
        this.thePage = 1;
      }
      this.previousKeyword = this.keyword
      console.log(`page = ${this.thePage}, size= ${this.thePageSize}, id = ${this.categoryId}`)
      this.productService.searchProductsPaginated(this.thePage - 1, this.thePageSize, this.keyword).subscribe(data => {
        this.products = data._embedded.products
        this.thePage = data.page.number + 1
        this.thePageSize = data.page.size
        this.totalElements = data.page.totalElements
      })
    }
    else {
      this.displayProducts();
    }
  }

  displayProducts() {
    let hasId: boolean = this.route.snapshot.paramMap.has("id");
    if (hasId) {
      this.categoryId = +this.route.snapshot.paramMap.get("id")!;
    }
    if (this.categoryId != this.previousId) {
      this.thePage = 1
    }
    this.previousId = this.categoryId
    console.log(`page = ${this.thePage}, size= ${this.thePageSize}, id = ${this.categoryId}`)
    this.productService.listProductsPaginated(this.thePage - 1, this.thePageSize, this.categoryId).subscribe(data => {
      this.products = data._embedded.products
      this.thePage = data.page.number + 1
      this.thePageSize = data.page.size
      this.totalElements = data.page.totalElements
    })
  }

  changePageSize(size: string) {
    this.thePageSize = +size
    this.thePage = 1
    this.listProducts()
  }

  addToCart(theProduct: Product) {
    const cartItem = new CartItem(theProduct)
    this.cartService.addProduct(cartItem)

  }

}
