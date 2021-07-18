import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Consignment} from '../models/consignment';
import {ModalService} from '../_services';

import {ConsignmentService} from '../services/consignment.service';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

    public daterangeInput = 'Filter By Date';
    public daterange: any = {};
    public activeTab = 'paid';
    public query: string = null;
    public dateStart: string = null;
    public dateEnd: string = null;
    public consignment: Consignment;
    public checkedProducts: Consignment[];

    public options: any = {
        locale: {format: 'YYYY-MM-DD'},
        alwaysShowCalendars: false,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    };

    constructor(private deliveryService: ConsignmentService,
                private modalService: ModalService) {
    }

    ngOnInit() {
    }

    public changeBillingTab(activeTab) {
        this.activeTab = activeTab;
    }

    public selectedDate(value: any) {
        this.dateStart = this.daterange.start = value.start;
        this.dateEnd = this.daterange.end = value.end;
    }

    public checkedConsignments($event) {
        this.checkedProducts = $event;
    }

    showConsignment($event) {
        this.openModal('consignment-modal', $event);
    }

    openModal(id: string, consignmentId: string): void {
        this.deliveryService
            .show(consignmentId)
            .subscribe(
                response => {
                    this.consignment = response.consignment;
                }
            );

        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    public calendarCanceled(e: any) {
        this.dateStart = null;
        this.dateEnd = null;
    }

    public calendarApplied(e: any) {
        const startDate = moment(this.daterange.start).format('MMMM D, YYYY');
        const endDate = moment(this.daterange.end).format('MMMM D, YYYY');

        this.daterangeInput = 'Filter By Date (' + startDate + ' - ' + endDate + ')';
    }
}
