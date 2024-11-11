import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: Product[] = [];

  constructor(private readonly router: Router, private readonly productService: ProductService, private readonly route: ActivatedRoute) { }

  doSearch(value: String) {
    console.log(`Hey! This is your data: ${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  ngOnInit(): void {
  }

}
