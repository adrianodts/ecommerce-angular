  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private readonly baseUrl = 'http://localhost:8080/api/product-category';
  constructor(private readonly httpClient: HttpClient) { }

  public getProductCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl)
      .pipe(
        map(response => response._embedded.productCategory)
      );
  }
}

interface GetResponse {
  _embedded: {
    productCategory: Category[];
  }
}
