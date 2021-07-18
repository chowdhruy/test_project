import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConsignmentService} from '../../services/consignment.service';
import {Consignment} from '../../models/consignment';

@Component({
    selector: 'app-consignments',
    templateUrl: './consignments.component.html',
    styleUrls: ['./consignments.component.css']
})
export class ConsignmentsComponent implements OnInit {
    consignmentId;
    consignment: Consignment;
    params;

    constructor(private deliveryService: ConsignmentService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => this.params = params);
    }

    ngOnInit() {
        this.getConsignmentDetail(this.params.id);
    }

    getConsignmentDetail(consignmentId): void {
        console.log(consignmentId);

        this.deliveryService
            .show(consignmentId)
            .subscribe(
                response => {
                    this.consignment = response.consignment;
                },
                err => {
                    console.log(err);
                }
            );
    }
}
