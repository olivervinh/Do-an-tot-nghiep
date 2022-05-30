import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  public list_item_in_cart:any;
  constructor(public http:HttpClient) {
    let existingCartItems = JSON.parse(localStorage.getItem('products'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
    let existingCartItems1 = JSON.parse(localStorage.getItem('loves'));
    if (!existingCartItems1) {
      existingCartItems1 = [];
    }
    this.itemsSubject.next(existingCartItems);
  }
  private itemsSubject1 = new BehaviorSubject<Product[]>([]);
  items1$ = this.itemsSubject1.asObservable();
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();
  addToCart(product:Product) {
    const clicks = localStorage.getItem('idUser');
      this.items$.pipe(
        take(1),
        map((products) => {
          products.push(product);
          localStorage.setItem('products', JSON.stringify(products));
        }),
      ).subscribe();
  }
  addToLove(product:Product) {
    const clicks = localStorage.getItem('idUser');
      this.items1$.pipe(
        take(1),
        map((products) => {
          products.push(product);
          localStorage.setItem('loves', JSON.stringify(products));
        }),
      ).subscribe();
  }
  DeleteProduct(product:Product) {
    const clicks = localStorage.getItem('idUser');
      this.items$.pipe(
        take(1),
        map((products) => {
          const index = products.indexOf(product);
          products.splice(index, 1);
          localStorage.setItem("products", JSON.stringify(products));
        }
        ),
      ).subscribe();
  }
  DeleteProductInLove(product:Product) {
      this.items1$.pipe(
        take(1),
        map((products) => {
          const index = products.indexOf(product);
          products.splice(index, 1);
          localStorage.setItem("loves", JSON.stringify(products));
        }
        ),
      ).subscribe();
  }
  LoadCard(){
    const clicks = localStorage.getItem('idUser');
    this.http.post(environment.URL_API+"Carts/getCart/"+clicks,{}).subscribe(
      res=>{
        var list_item = res;
        localStorage.setItem('products',JSON.stringify(list_item));
      }
    );
  }
}
