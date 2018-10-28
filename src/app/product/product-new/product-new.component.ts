import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { IProduct } from './../../models/product';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  public newProduct={} as IProduct;
  productForm: FormGroup;

  constructor(
    private productService: ProductsService,
    private _router: Router
 
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  
  createProduct(newProduct) {
    this.productService.createProduct(this.newProduct).subscribe(res => {
    this._router.navigate(['/']);

  }, err => {
    alert("Error while creating a product");
  });
}

}
