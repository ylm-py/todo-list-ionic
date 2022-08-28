import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  private data = [];
  private dataAfterAdd = [];
 
  constructor() { }
 
  setData(id, data) {
    if(id){
    this.data[id] = data;
    }
    else{
      console.log('error on data.services.ts no ID')
    }
  }
 
  getData(id) {
    if(id){
    return this.data[id];
    }
  }
  setDataAfterAdd(data) {
    this.dataAfterAdd = [];
    this.dataAfterAdd.push(data);
  }
  getDataAfterAdd() {
    return this.dataAfterAdd;
  }
}