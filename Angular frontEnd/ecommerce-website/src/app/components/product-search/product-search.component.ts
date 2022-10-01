import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  doSearch(value: string) {
    this.route.navigateByUrl(`/search/${value}`)
  }

}
