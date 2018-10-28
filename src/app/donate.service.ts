import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators'
@Injectable({
    providedIn:'root'
})
export class DonateService{
    constructor(private http: HttpClient){}
    donate(amount){
        return this.http.post('http://localhost:3000/pay/'+amount,{amount:amount})
        .pipe(map(
            (response:{message:string}) =>{
                return response;
            }
        ))
    }
}