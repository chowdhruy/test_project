import {Component, OnInit} from '@angular/core';
import {OverallService} from '../_services/overall.service';
import {UtilsService} from '../_services/utils.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    overview = {
        total_sales: 0,
        total_paid: 0,
        total_shipping_cost: 0,
        amount_uninvoiced: 0,
        amount_unsettled: 0,
        parcels_delivered: 0,
        parcels_returned: 0,
        parcels_pending: 0
    };

    constructor(
        private overallService: OverallService,
        private utils: UtilsService
    ) {
    }

    ngOnInit() {
        this.overviewData();
    }

    overviewData(): void {
        this.overallService
            .overallData()
            .subscribe(
                response => {
                    this.overview = response.overview;
                },
                err => {
                    console.log(err);
                }
            );
    }

    isApproved(): boolean {
        return this.utils.isApproved();
    }
}
