import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

    @Input('status') status: string;
    @Input('statusReturn') statusReturn: string;
    @Input('page') page: string;

    public background: string;
    public label: string;

    private statusArray = {
        default: {background: 'label-info', label: 'Status'},
        assigned: {background: 'label-success', label: 'On the Way'},
        canceled: {background: 'label-danger', label: 'Canceled'},
        delivered: {background: 'label-success', label: 'Delivered'},
        delivering: {background: 'label-info', label: 'Delivering'},
        exchange_delivered: {background: 'label-success', label: 'Exchanged & Delivered'},
        future_delivery: {background: 'label-warning', label: 'Future Delivery'},
        hold: {background: 'label-warning', label: 'Hold'},
        on_store: {background: 'label-info', label: 'On Store'},
        partial_delivered: {background: 'label-warning', label: 'Partial Delivered'},
        returned: {background: 'label-danger', label: 'Returned'},
        shipped: {background: 'label-success', label: 'Shipped'},
    };

    constructor() {
    }

    ngOnInit() {
        this.getBackgroundColor();
    }

    private getBackgroundColor(): void {
        const statusData = this.statusArray[this.status];

        if (statusData !== undefined) {
            this.background = statusData.background;
            this.label = this.formatPageLabel(statusData.label);

            return;
        }

        this.background = this.statusArray.default.background;
        this.label = this.status;
    }

    private formatPageLabel(label): string {
        if (typeof this.page === 'undefined') {
            return label;
        }

        if (this.page === 'paid') {
            label += ' & Paid';
        }

        if (this.page === 'unpaid') {
            label += ' & Unpaid';
        }

        if (this.page === 'failed') {
            if (this.statusReturn === 'assigned') {
                label += ' & Returning';
            } else if (this.statusReturn === 'returned') {
                label += ' & Returned';
            }
        }

        if (this.page === 'returned') {
            label += ' & Returned';
        }

        return label;
    }
}
