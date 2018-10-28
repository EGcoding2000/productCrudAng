import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './../models/product';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductsService {


  productUrl: string = environment.backEndUrl + '/api/products/';

  constructor(private http: HttpClient) { }

  // Create a new product
  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.productUrl, product);
  }

  // Return the Products list
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl);
  }

  // Return 1 product details
  getProductDetails(productId): Observable<IProduct> {
    return this.http.get<IProduct>(this.productUrl + '/' + productId);
  }

  //Edit 1 product
  editProduct(product: any): Observable<IProduct> {
    return this.http.put<IProduct>(this.productUrl, product);
  }

  // Delete 1 product
  deleteProduct(productId): Observable<any> {
    return this.http.delete<any>(this.productUrl + '/' + productId);
  }


}
