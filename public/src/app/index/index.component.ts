import {Component, NgModule, VERSION, OnInit, OnDestroy, Class} from '@angular/core'
import { Bid } from './../bid';
import { Product } from './../product';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router }  from '@angular/router';


import {BrowserModule} from '@angular/platform-browser'
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  term1: FormControl = new FormControl(); // form control of text input
  termSubscription1; // subscription of term eventEmitter sequence

  term2: FormControl = new FormControl(); // form control of text input
  termSubscription2; // subscription of term eventEmitter sequence
  
  term3: FormControl = new FormControl(); // form control of text input
  termSubscription3; // subscription of term eventEmitter sequence

  user;
  prodIds=[];
 
  products = [];

  answer1 = [];
  filteredAnswer1=[];
  answer2 = [];
  filteredAnswer2=[];
  answer3 = [];
  filteredAnswer3=[];

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
    // console.log("product ids", this.prodIds);
    // console.log("answer1", this.answer1)
    // console.log("answer2", this.answer2)
    // console.log("answer3", this.answer3)

    this.answer1 = this.answer1.sort((a,b) => 
      b.bids - a.bids 
    );
    this.answer2 = this.answer2.sort((a,b) => 
    b.bids - a.bids 
  );
  this.answer3 = this.answer3.sort((a,b) => 
  b.bids - a.bids);

  this.termSubscription1 = this.term1.valueChanges // event emitter that fires when formControl value changes
  .debounceTime(400) // only continue sequence if event has not emitted in the past 400 milliseconds
  .distinctUntilChanged() // only continue sequence if value has changed from last event emit
  .subscribe(
    term1 => {
        // determine filterBy value
        let filterBy = term1 ? term1.toLowerCase() : null;
        // do case insensitive search
        let filteredA = filterBy 
          ? this.answer1.filter(item => item.user.toLowerCase().indexOf(filterBy) !== -1)
          : this.answer1;
        // generate display array
        this.filteredAnswer1 = filteredA;
      }
  )


  this.termSubscription2 = this.term2.valueChanges // event emitter that fires when formControl value changes
  .debounceTime(400) // only continue sequence if event has not emitted in the past 400 milliseconds
  .distinctUntilChanged() // only continue sequence if value has changed from last event emit
  .subscribe(
    term2 => {
        // determine filterBy value
        let filterBy = term2 ? term2.toLowerCase() : null;
        // do case insensitive search
        let filteredA = filterBy 
          ? this.answer2.filter(item => item.user.toLowerCase().indexOf(filterBy) !== -1)
          : this.answer2;
        // generate display array
        this.filteredAnswer2 = filteredA;
      }
  )

  this.termSubscription3 = this.term3.valueChanges // event emitter that fires when formControl value changes
  .debounceTime(400) // only continue sequence if event has not emitted in the past 400 milliseconds
  .distinctUntilChanged() // only continue sequence if value has changed from last event emit
  .subscribe(
    term3 => {
        // determine filterBy value
        let filterBy = term3 ? term3.toLowerCase() : null;
        // do case insensitive search
        let filteredA = filterBy 
          ? this.answer3.filter(item => item.user.toLowerCase().indexOf(filterBy) !== -1)
          : this.answer3;
        // generate display array
        this.filteredAnswer3 = filteredA;
      }
  )
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

    this._apiService.refreshBids();
    this._apiService.getProducts();
    this.products = this._apiService.getPList(); // grabbing current products list
    // console.log(`Current Products list ${this.products}`);
    this.getProdId();
    this.filterBids();
  }

  hello(){
    if(this.answer1.length < 1 || this.answer2.length < 1 || this.answer3.length < 1){
      alert("Cannot end the bid.  One product does not have any bid yet!")
    } else {
      this.router.navigateByUrl("/results");   // Navigate back to index
    }
  }

  
}
