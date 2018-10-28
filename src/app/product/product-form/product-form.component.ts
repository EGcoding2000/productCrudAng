import { Component, OnInit, Input, Output } from '@angular/core';
import { IProduct } from './../../models/product';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor() { }
  @Input() product: IProduct;
  @Output() submitedProduct: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  
  productForm: FormGroup;


  ngOnInit() {
    this.productForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    this.submitedProduct.emit(this.product);
}

}
