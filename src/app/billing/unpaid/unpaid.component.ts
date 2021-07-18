import {Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges} from '@angular/core';
import {ConsignmentService} from '../../services/consignment.service';
import {Consignment} from '../../models/consignment';
import {Pagination} from '../../models/pagination';
import * as moment from 'moment';

@Component({
    selector: 'app-unpaid',
    templateUrl: './unpaid.component.html',
    styleUrls: ['./unpaid.component.css']
})
export class UnpaidComponent implements OnInit, OnChanges {
    @Input('query') query: string;
    @Input('dateStart') dateStart: any;
    @Input('dateEnd') dateEnd: any;
    @Output() showConsignmentDetails = new EventEmitter<string>();

    pagination: Pagination;
    products: Consignment[];
    consignment: Consignment;
    subscription: any;

    constructor(private deliveryService: ConsignmentService,) {
    }

    ngOnInit() {
        this.getProducts();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getProducts();
    }

    getProducts(page: number = 1): void {
        const searchData = {status: 'unpaid', page: page};

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

    showConsignment(consignmentId: string): void {
        this.showConsignmentDetails.emit(consignmentId);
    }

    onPageChange(page): void {
        this.getProducts(page);
    }
}
