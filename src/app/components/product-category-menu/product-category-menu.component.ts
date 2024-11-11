import { Component, OnInit } from '@angular/core';
import { Category } from '../../common/category';
import { ProductCategoryService } from '../../services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  categoryList: Category[] = [];

  constructor(private readonly productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.productCategoryService.getProductCategories().subscribe(
      data => {
        this.categoryList = data;
      });
  };
}
