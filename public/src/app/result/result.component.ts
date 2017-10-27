import { Component, OnInit, Class } from '@angular/core';
import { Bid } from './../bid';
import { Product } from './../product';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router }  from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  user;
  prodIds=[];
 
  products = [];

  answer1 = [];
  maxbid1;
  answer2 = [];
  maxbid2;
  answer3 = [];
  maxbid3;

  // newProd: Product = new Product(
  //   "",
  // )

  newBid: Bid = new Bid(
    "",
    "",
  )



  constructor(
    private _apiService: ApiService,
    private router: Router,
  ) { }


  ngOnInit() {
    // this.appts = this._apiService.appts();
    this.user = this._apiService.loggedIn();
    console.log(`Currently Logged In ${this.user}`)
    this.products = this._apiService.getPList(); // grabbing current products list
    console.log(`Current Products list ${this.products}`);
    this.getProdId();
    this.filterBids();

    // this.test();
    console.log("product ids", this.prodIds);
    // console.log("answer1", this.answer1)
    // console.log("answer2", this.answer2)
    // console.log("answer3", this.answer3)
    this.highBid1();
    console.log(this.maxbid1)
    // console.log(this.maxbid2)
    // console.log(this.maxbid3)
  }

  logout(){
    this._apiService.logout();
  }

  getProdId(){
    for(var i=0; i< this.products.length; i++){
    this._apiService.showBids(this.products[i]._id, [i])
    this.prodIds.push(this.products[i]._id);
    }
  }

  //Filter Bids
  filterBids(){
    console.log(this.products.length)
    for(var i=0; i<this.products.length; i++){
      if(this.products[i].name == "Product 1"){
        // console.log("hello")
        this.answer1 = this._apiService.getBid1();
      } else if(this.products[i].name == "Product 2"){
        // console.log("GoodBye")
        this.answer2 = this._apiService.getBid2();
      } else {
        // console.log("Boo!")
        this.answer3 = this._apiService.getBid3();
      }
    }
  }

  // Product creation
  // onSubmit(){
  //   console.log(this.newProd);
  //   this._apiService.createProd(this.newProd);
  //   this.newProd = new Product(
  //     "",
  //   );
  // }

// Bid Creation

  onSubmit(id){
    this.newBid.user = this.user;
    // console.log(this.newBid);
    // console.log("this is the id", id);
    this._apiService.createBid(this.newBid, id);

    this.newBid = new Bid(
      "",
      "",
    );
  }

  hello(){
    if(this.answer1.length < 1 || this.answer2.length < 1 || this.answer3.length < 1){
      alert("Cannot end the bid.  One product does not have any bid yet!")
    } else {
      this.router.navigateByUrl("/results");   // Navigate back to index
    }
  }

  highBid1(){
    var checker;
    var max = 0;
    for(var i=0; i<this.answer1.length; i++){
      // console.log(this.answer1[i].bid)
      if(this.answer1[i].bid > max){
        max == this.answer1[i].bid;
        checker == this.answer1[i];
      }
      // console.log(max);
      // this.maxbid1 == checker;
    }
    console.log(max);
    this.maxbid1 == checker;
  }
  highBid2(){
    var max = 0;
    for(var i=0; i<this.answer2.length; i++){
      if(this.answer2[i].bid > max){
        max == this.answer2[i];
      }
    }
    this.maxbid2 == max;
  }
  highBid3(){
    var max = 0;
    for(var i=0; i<this.answer3.length; i++){
      
      if(this.answer3[i].bid > max){
        max == this.answer3[i];
      }
    }
    this.maxbid3 == max;
  }

  
}