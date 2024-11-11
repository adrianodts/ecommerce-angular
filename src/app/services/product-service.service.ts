import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly httpClient: HttpClient) { }

  private readonly baseUrl = 'http://localhost:8080/api/products';
  private readonly productsByCategoryIdUrl = `${this.baseUrl}/search/findByCategoryId?id=`;
  private readonly productsByNameContainingUrl = `${this.baseUrl}/search/findByNameContaining?name=`;

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);//.pipe(map(response => response));
  }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl)
      .pipe(
        map(response => response._embedded.products)
      );
  }

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }


  searchProductsPaginate(keyword: string, page: number, pageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.productsByNameContainingUrl}${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.productsByCategoryIdUrl}${categoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.productsByNameContainingUrl}${keyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response._embedded.products));
  }
}
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
