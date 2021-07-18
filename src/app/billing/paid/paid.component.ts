import {Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges} from '@angular/core';
import {ConsignmentService} from '../../services/consignment.service';
import {Consignment} from '../../models/consignment';
import {Pagination} from '../../models/pagination';
import * as moment from 'moment';

@Component({
    selector: 'app-paid',
    templateUrl: './paid.component.html',
    styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit, OnChanges {
    @Input('query') query: string;
    @Input('dateStart') dateStart: any;
    @Input('dateEnd') dateEnd: any;
    @Output() showConsignmentDetails = new EventEmitter<string>();

    products: Consignment[];
    consignment: Consignment;
    pagination: Pagination;
    subscription: any;

    constructor(private deliveryService: ConsignmentService) {
    }

    ngOnInit() {
        this.getProducts();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getProducts();
    }

    showConsignment(consignmentId: string): void {
        this.showConsignmentDetails.emit(consignmentId);
    }

    getProducts(page: number = 1): void {
        const searchData = {status: 'paid', page: page};

        if (this.query != null) {
            searchData['query'] = this.query;
        }

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.dateStart != null) {
            searchData['date_start'] = moment(this.dateStart).format('YYYY-MM-DD');
        }

        if (this.dateEnd != null) {
            searchData['date_end'] = moment(this.dateEnd).format('YYYY-MM-DD');
        }

        this.deliveryService
            .list(searchData)
            .subscribe(
                response => {
                    this.products = response.consignments;
                    this.pagination = response.pagination;
                }
            );
    }

    onPageChange(page): void {
        this.getProducts(page);
    }
}
