import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class DataResolverService2 implements Resolve<any> {
 
  constructor(private dataService: DataService) { }
 
  resolve() {
    return this.dataService.setDataAfterAdd;
  }
}