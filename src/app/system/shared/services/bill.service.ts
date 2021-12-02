import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApi } from "src/app/shared/core/base-api";
import { Bill } from "../models/bill.model";

@Injectable()
export class BillService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    getBill(): Observable<any> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://www.cbr-xml-daily.ru/latest.js`)
            .pipe(map((res) => res));
    }
}

