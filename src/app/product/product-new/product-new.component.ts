import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { IProduct } from './../../models/product';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  public newProduct={} as IProduct;

  constructor(
    private productService: ProductsService,
    private _router: Router
 
  ) { }

  ngOnInit() {
  }

  
  createProduct(newProduct) {
    this.productService.createProduct(this.newProduct).subscribe(res => {
    this._router.navigate(['/']);

  }, err => {
    alert("Error while creating a product");
  });
}

}
