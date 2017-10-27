import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Bid } from './bid';
import "rxjs/Rx";


@Injectable()
export class ApiService {

  private user = '';
  private products = [];
  private bids1 = [];
  private bids2 = [];
  private bids3 = [];

  constructor(
    private _http: Http,
  ) {
    this.getProducts();  //get current products in database upon initial construction
    
  }

  login(user){
    this.user = user;
  }

  loggedIn(){
    return this.user;
  }

  logout(){
    this.user = "";
  }

  createProd(data){
    this._http.post('/product', data).toPromise()
    .then(data => {
      console.log(`Data response from appt creation ${data}`)
    })
    .catch(err =>{
      console.log(`Error response during appt creation`)
    });
  }

  createBid(bidData, id){
    this._http.post(`/bids/${id}`, bidData).toPromise()
    .then(data => {
      console.log(`Data response from appt creation ${data}`)
    })
    .catch(err =>{
      console.log(`Error response during appt creation`)
    });
  }

  getProducts(){
    var allProds = this._http.get('/product')
    .map(data=>data.json())
    .toPromise()

    allProds.then(data=>{
      // console.log("data from server", data);
      for (var i=0; i< data['products'].length; i++){
        this.products.push(data['products'][i]);
      }
    });
    // console.log("products list ", this.products);
  }
      
  getPList(){
    console.log(this.products);
    return this.products;
  }

  showBids(id, idx) {
    var bids = this._http.get(`/bids/${id}`)
      .map(data => data.json())
      .toPromise()

    bids.then(data => {      //cleans up the initial response data
      console.log("Bid Data", data);
      for (var i = 0; i < data['bids'].length; i++) {
        if(idx == 0){
          this.bids1.push(data['bids'][i])
        } else if (idx == 1){
          this.bids2.push(data['bids'][i])
        } else {
          this.bids3.push(data['bids'][i])
        }
      }
    });
    // console.log("All Bids", this.bids1);
    // console.log("All Bids", this.bids2);
    // console.log("All Bids", this.bids3);
  }

  getBid1(){

    return this.bids1;
  }
  getBid2(){
    
        return this.bids2;
  }
  getBid3(){
    
        return this.bids3;
  }

  // clearAllBids(){
  //   this.allBids=[];
  // }

  refreshBids(){
    this.bids1 = [];
    this.bids2=[];
    this.bids3=[];
  }

}
