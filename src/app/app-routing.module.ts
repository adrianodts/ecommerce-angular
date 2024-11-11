import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingDetailComponent } from './components/shopping-detail/shopping-detail.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category/:id/:categoryName', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'shopping-detail', component: ShoppingDetailComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
    // { path: 'checkout', component: CheckoutPageComponent },
    // { path: 'product-detail', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
