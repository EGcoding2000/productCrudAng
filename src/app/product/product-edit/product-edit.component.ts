import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { IProduct } from './../../models/product';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public editProduct = {} as IProduct;
  productForm: FormGroup;
  productId: string;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id");
    this.getProduct();
    this.productForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
    });

  }

  getProduct(){
    this.productService.getProductDetails(this.productId).subscribe(res => {
      this.editProduct = res;
      console.log(this.editProduct);
    }, err => {
      alert("we did not get the product");
    });
  }
  onEditProduct(submitedProduct) {
    // if (this.productForm.invalid) {
    //   return;
    // }
    // console.log(this.productForm);
    this.productService.editProduct(submitedProduct).subscribe(res => {
    this._router.navigate(['/']);

  }, err => {
    alert("Error while editing the product");
  });
}

}
