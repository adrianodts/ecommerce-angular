import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  constructor(private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetail();
    });
  }

  handleProductDetail() {
    const productId: number = +this.route.snapshot.paramMap.get("id")!;
    this.productService.getProduct(productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
    const cartItem: any = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }
}
