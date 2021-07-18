import {Component, OnChanges, SimpleChanges, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {Consignment} from '../../models/consignment';
import {Pagination} from '../../models/pagination';
import {ConsignmentService} from '../../services/consignment.service';
import {ModalService} from '../../_services';
import * as moment from 'moment';

@Component({
    selector: 'app-all-shipment',
    templateUrl: './all-shipment.component.html',
    styleUrls: ['./all-shipment.component.css']
})
export class AllShipmentComponent implements OnInit, OnChanges {

    @Input('dateStart') dateStart: any;
    @Input('dateEnd') dateEnd: any;
    @Input('query') query: string;
    @Output() checkedConsignments = new EventEmitter<Consignment[]>();
    @Output() showConsignmentDetails = new EventEmitter<string>();

    private bodyText: string;
    page: number;
    total: number;
    products: Consignment[];
    consignment: Consignment;
    pagination: Pagination;

    markedProducts = [];
    confirmProducts: Consignment[];
    subscription: any;

    constructor(private deliveryService: ConsignmentService,
                private modalService: ModalService,
                public ngProgress: NgProgress) {
    }

    ngOnInit() {
        this.getProducts();
        this.bodyText = 'This text can be updated in modal 1';
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getProducts();
    }

    getProducts(page: number = 1): void {
        const searchData = {status: 'all', page: page};

        if (this.query != null) {
            searchData['query'] = this.query;
        }

        if (this.dateStart != null) {
            searchData['date_start'] = moment(this.dateStart).format('YYYY-MM-DD');
        }

        if (this.dateEnd != null) {
            searchData['date_end'] = moment(this.dateEnd).format('YYYY-MM-DD');
        }

        this.ngProgress.start();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.deliveryService
            .list(searchData)
            .subscribe(
                response => {
                    this.products = response.consignments;
                    this.pagination = response.pagination;

                    this.ngProgress.done();
                }
            );
    }

    showConsignment(consignmentId: string): void {
        this.showConsignmentDetails.emit(consignmentId);
    }

    checkConsignments(e, uid: string) {
        if (e.target.checked) {
            this.markedProducts.push(uid);
        } else {
            this.markedProducts.splice(this.markedProducts.indexOf(uid), 1);
        }

        // this.hasCheck = (this.markedProducts.length > 0);
        this.confirmProducts = this.getConfirmedProducts();
        this.checkedConsignments.emit(this.confirmProducts);
    }

    getConfirmedProducts() {
        return this.products
            .filter(product => {
                const hasData = this.markedProducts.indexOf(product.uid);

                return hasData !== -1;
            });
    }

    onPageChange(page): void {
        this.getProducts(page);
    }
}
