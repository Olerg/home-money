import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Bill } from "../models/bill.model";

@Injectable()
export class BillService {
    constructor(private http: HttpClient) { }

    getBill(): Observable<any> {
        return this.http.get('http://localhost:3000/bill')
            .pipe(map((res) => res));
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://www.cbr-xml-daily.ru/latest.js`)
            .pipe(map((res) => res));
    }
}

