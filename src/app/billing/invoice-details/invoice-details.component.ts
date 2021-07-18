import {Component, OnChanges, SimpleChanges, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment} from '../../models/payment';
import {PaymentService} from '../../services/payment.service';
import {Items} from '../../models/payment_items';
import {Pagination} from '../../models/pagination';
import {ModalService} from '../../_services';
import * as moment from 'moment';
import {NgProgress} from 'ngx-progressbar';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit, OnChanges {

    @Input('query') query: string;
    @Input('dateStart') dateStart: any;
    @Input('dateEnd') dateEnd: any;
    @Output() showPaymentDetails = new EventEmitter<string>();

    public payment: Payment;
    pagination: Pagination;
    subscription: any;
    payments: Payment[];
    items: Items[];

    constructor(private paymentService: PaymentService,
                private  modalService: ModalService,
                public ngProgress: NgProgress) {
    }

    ngOnInit() {
        this.getInvoices();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getInvoices();
    }

    getInvoices(page: number = 1): void {
        const searchData = {status: 'invoice', page: page};

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

        this.paymentService
            .list(searchData)
            .subscribe(
                response => {
                    this.payments = response.payments;
                    this.pagination = response.pagination;
                }
            );
    }

    showPayment($event) {
        this.openModal('payment-modal', $event);
    }

    download(id: string) {
        console.log('Download clicked!');

        this.paymentService
            .download(id)
            .subscribe(
                data => {
                    FileSaver.saveAs(data, 'something.xlsx');
                }
            );
    }

    openModal(id: string, paymentId: string): void {
        this.paymentService
            .show(paymentId)
            .subscribe(
                response => {
                    this.payment = response.payment;
                }
            );

        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    onPageChange(page): void {
        this.getInvoices(page);
    }
}
