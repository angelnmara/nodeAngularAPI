import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Dealer } from '../../model/dealer/dealer.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  private basePath = environment.apiUrl.concat('brand')
  
  constructor(private http:HttpClient) { }

  getDealers(){
    return this.http.get<Dealer[]>(this.basePath, {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Headers':'Content-Type'
      })
    }).pipe(map((res)=>res));
  }

  getDealerById(id:number){
    return this.http.get<Dealer>(`${this.basePath}/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Headers':'Content-Type'
      })
    }).pipe(map((res)=>res));
  }

  saveDealer(brand:Dealer){
    return this.http.post<Dealer>(this.basePath, brand, {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Headers':'Content-Type'
      })
    }).pipe(map((res)=>res));
  }

  deleteDealer(id:number){
    return this.http.delete<Object>(`${this.basePath}/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Headers':'Content-Type'
      })
    })
  }

}

