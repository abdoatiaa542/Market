import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {

  products:product[] = [];
  categories:string[] = [];
  loading:boolean =false;
  cartProducts:any[]=[];

  constructor(private services:ProductsService){}

  ngOnInit(): void {
    this.getProducts();
  this.getCategories();

  }

  getProducts(){
    this.loading = true;
    this.services.getAllProducts().subscribe((res:any)=>{
      this.products = res
      this.loading = false;
      
    }  ,error=> {
      this.loading = false;

     alert("error")
    })
  }

  getCategories(){
    this.loading = true;

    this.services.getAllCategories().subscribe((res:any)=>{
      console.log(res)
      this.categories = res
      this.loading = false;

      
    }  ,error=> {
    this.loading = false;

      alert("Error")

    })
  }

  filterCategory(event:any){
    let value =event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value)
  }
  getProductsCategory(keyword:string){
    this.loading = true;
    this.services.getProductsByCategory(keyword).subscribe((res:any) =>{
    this.loading = false;
    this.products = res
    })
  }

  addToCart(event:any){

     if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist){
        alert("product is already in Cart")
      }else{
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      }
      

     } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
     }

  }

}
