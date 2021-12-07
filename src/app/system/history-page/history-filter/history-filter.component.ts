import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
    selector: 'wfm-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

    @Output() onFilterCancel = new EventEmitter<any>();
    @Output() onFilterApply = new EventEmitter<any>();

    @Input() categories: Category[] = [];

    selectedPeriod = 'd';
    selectedTypes:Array<any> = [];
    selectedCategories:Array<any> = [];

    timePeriods = [
        { type: 'd', label: 'День' },
        { type: 'w', label: 'Неделя' },
        { type: 'M', label: 'Месяц' }
    ];

    types = [
        { type: 'income', label: 'Доход' },
        { type: 'outcome', label: 'Расход' }
    ];

    closeFilter() {
        this.selectedTypes = [];
        this.selectedCategories = [];
        this.selectedPeriod = 'd';
        this.onFilterCancel.emit();
    }

    private calculateInputParams(field:any, checked: boolean, value: string) {
        if (checked) {
            field.indexOf(value) === -1 ? field.push(value) : null;
        } else {           
           field = field.filter((it:any) => it !== value);
           console.log(field);
        }
    }

    handleChangeType(e:any) {
        this.calculateInputParams(this.selectedTypes, e.checked, e.value);
    }

    handleChangeCategory(e:any) {
        this.calculateInputParams(this.selectedCategories, e.checked, e.value);
    }

    applyFilter() {
        this.onFilterApply.emit({
            types: this.selectedTypes,
            categories: this.selectedCategories,
            preiod: this.selectedPeriod
        });
    }



}
