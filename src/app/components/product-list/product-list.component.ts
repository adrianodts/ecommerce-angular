import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { Product } from '../../common/product';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart-service.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  cartItems: CartItem[] = [];
  currentCategoryName: String | null = "";
  previousKeyword: String | null = "";
  searchMode: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  @Output()
  filterString: Subject<string> = new Subject<string>();
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  constructor(private readonly productService: ProductService, private readonly cartService: CartService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      //.snapshot.paramMap.get("id")!;
      this.listProducts();
  });
    // this.filterString.pipe(
    //     debounceTime(300),
    //     switchMap(value => this.productService.filterProduct(value))
    // ).subscribe(data => {
    //     this.productList = data;
    // });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get("keyword")!;
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;
    this.productService.searchProductsPaginate(keyword, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.get("id");
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
      this.currentCategoryName = this.route.snapshot.paramMap.get("categoryName");
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.productList = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: String) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }



}
