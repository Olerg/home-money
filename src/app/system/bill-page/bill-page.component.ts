import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { BillService } from '../shared/services/bill.service';

@Component({
    selector: 'wfm-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    subscription!: Subscription;

    constructor(private billService: BillService) { }

    ngOnInit() {
        this.subscription = combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency(),
        ).subscribe((data: [any, any]) => {
            console.log(data);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
