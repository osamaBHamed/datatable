import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class facilitiesService{
    baseURL:string="http://localhost/ENOC/api/Facilities";
    constructor(private http:HttpClient){}

    loadAll():Observable<any>{
        debugger;
        return this.http.get(this.baseURL+ "/LoadAll")
    }
}