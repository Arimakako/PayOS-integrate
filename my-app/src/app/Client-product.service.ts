import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders ,HttpParams} from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Product } from './Products';
@Injectable({
  providedIn: 'root'
})
export class ClientProductService {
  constructor(private _http: HttpClient) { }

  // get all product
  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/products", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError))
  }

  // get product by id
  getProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/products/" + productId, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError))
  }

  getProductsFiltered(lowerPrice: number, upperPrice: number, pettype: string,cate:string, sort: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('lowerPrice', lowerPrice.toString())
      .set('upperPrice', upperPrice.toString())
      .set('pettype', pettype)
      .set('cate',cate)
      .set('sort', sort);
  
    return this._http.get<Product[]>('/products', { params }).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}