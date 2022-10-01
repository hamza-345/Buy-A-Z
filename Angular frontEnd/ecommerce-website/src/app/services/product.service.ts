import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchProductsPaginated(thePage: number, thePageSize: number, keyword: string) {
    let url = `http://localhost:8080/api/products/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponseProducts>(url);
  }

  listProductsPaginated(page: number, size: number, id: number) {
    let url = `http://localhost:8080/api/products/search/findByCategoryId?id=${id}&page=${page}&size=${size}`
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProduct(id: number): Observable<Product> {
    let url = `http://localhost:8080/api/products/${id}`
    return this.httpClient.get<Product>(url);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    let url = `http://localhost:8080/api/products/search/findByNameContaining?name=${keyword}`
    return this.httpClient.get<GetResponseProducts>(url).pipe(map(data => data._embedded.products))
  }
  getProductCategories(): Observable<ProductCategory[]> {
    let url = "http://localhost:8080/api/product-category";
    return this.httpClient.get<GetResponseProductCategories>(url).pipe(map(data => data._embedded.productCategory))
  }

  constructor(public httpClient: HttpClient) { }

  getProducts(categoryId: number): Observable<Product[]> {
    let url = `http://localhost:8080/api/products/search/findByCategoryId?id=${categoryId}`
    return this.httpClient.get<GetResponseProducts>(url).pipe(map(data => data._embedded.products))
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[],
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
