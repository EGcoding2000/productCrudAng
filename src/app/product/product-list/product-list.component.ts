import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './../../models/product';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: IProduct[];

  // see https://www.npmjs.com/package/ngx-filter-pipe
  userFilter: any = { name: '' };

  // We get from the server the 'product list' sorted by name Asc 
  public sortBy: string = "name";
  public sortNameAsc: boolean = true;
  public sortPriceAsc: boolean = false;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {

    //this function will get all the products via service

    this.productsService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  deleteProduct(productId) {

    //This function will delete a product via service 

    this.productsService.deleteProduct(productId).subscribe(res => {
      alert("product deleted successfully");
      this.getProducts();
    }, err => {
      alert("The product is still alive!");
    });

  }

  sortByName() {

    //This function will sort the products according to name 

    if (!this.sortNameAsc) {
      // If the products are sorted desc -> sort Asc 
      this.products.sort((a, b) => {
        let aTemp = a.name.toLowerCase();
        let bTemp = b.name.toLowerCase();
        return (aTemp > bTemp) ? 1 : ((bTemp > aTemp) ? -1 : 0);
      });
    } else {
      // Products are sorted Asc. so we sort Desc. 
      this.products.sort((a, b) => {
        let aTemp = a.name.toLowerCase();
        let bTemp = b.name.toLowerCase();
        return (aTemp > bTemp) ? -1 : ((bTemp > aTemp) ? 1 : 0);
      });
    }
    //Change the current sort option
    this.sortNameAsc = !(this.sortNameAsc);

    if (this.sortBy !== "name") {
      //set the current sory by to 'name'
      this.sortBy = "name";
    }

  }

  sortByPrice() {
    if (!this.sortPriceAsc) {
      // If the products are sorted desc -> sort Asc 
      this.products.sort((a, b) => a.price - b.price);
    } else {
      // Products are sorted Asc. so we sort Desc. 
      this.products.sort((a, b) => b.price - a.price);
    }
    //Change the current sort option
    this.sortPriceAsc = !(this.sortPriceAsc);

    if (this.sortBy !== "price") {
      //set the current sory by to 'price'
      this.sortBy = "price";
    }
  }

}
