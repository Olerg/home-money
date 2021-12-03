import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

@Component({
    selector: 'wfm-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoriesService: CategoriesService, private evetService: EventsService) { }

    isLoaded = false;
    s1!: Subscription;

    categories: Category[] = [];
    events: WFMEvent[] = [];
    chartData:any = [];

    ngOnInit() {
        this.s1 = combineLatest(
            this.categoriesService.getCategories(),
            this.evetService.getEvents()
        ).subscribe((data: [Category[], WFMEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];

            this.calculateChartData();
            this.isLoaded = true;

        });
    }

    calculateChartData(): void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.chartData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }


    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}
