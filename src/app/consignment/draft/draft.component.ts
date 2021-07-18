import {Component, OnInit, Input, Output,EventEmitter, OnChanges,SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Consignment} from '../../models/consignment';
import {PickupService} from '../../services/pickup.service';
import {PickupForm} from '../../models/pickup-form';
import {Pagination} from '../../models/pagination';
import {ConsignmentService} from '../../services/consignment.service';
import {ModalService} from '../../_services';
import {LocationService} from '../../services/location.service';
import * as moment from 'moment';
@Component({
    selector: 'app-draft-consignment',
    templateUrl: './draft.component.html',
    styleUrls: ['./draft.component.css']
})

export class DraftComponent implements OnInit, OnChanges {
    public daterange: any = {};
    @Input('query') query: string;

    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
        singleDatePicker: true,
        showDropdowns: true
    };

    private bodyText: string;
    pagination: Pagination;
    products: Consignment[];
    confirmProducts: Consignment[];
    consignment: Consignment;
    markedProducts = [];
    deleteTarget = null;
    addresses = [];
    hasError = false;
    csvData = '';
    subscription: any;
    @Input() pickup: PickupForm = {
        address_id: null,
        request_date: '',
        quantity: 0,
        consignments: '',
        timeFrame: null,
        notes: ''
    };
    submitted = false;
    hasCheck = false;

    constructor(private pickupService: PickupService,
                private deliveryService: ConsignmentService,
                private modalService: ModalService,
                private location: LocationService,
                private router: Router) {
    }

    ngOnInit() {
        this.getProducts();
        this.addressList();
        this.bodyText = 'This text can be updated bla bla';
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getProducts();
    }

    getProducts(page: number = 1): void {
        const searchData = {status: 'draft', page: page};

        if (this.query != null) {
            searchData['query'] = this.query;
        }

        if (this.subscription) {
            this.subscription.unsubscribe();
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

    openModal(id: string, consignmentId: string): void {
        this.deliveryService
            .show(consignmentId)
            .subscribe(
                response => {
                    this.consignment = response.consignment;

                    this.modalService.open(id);
                }
            );
    }

    openDeleteAlert(id: string, consignmentId: string): void {
        this.modalService.open(id);
    }

    openConfirm(id: string): void {
        this.confirmProducts = this.getConfirmedProducts();

        this.pickup.consignments = this.markedProducts.join();
        this.pickup.quantity = this.markedProducts.length;

        this.modalService.open(id);
    }

    deleteGroup(id: string, consignmentId: string): void {
        // this.pickup.consignments = this.markedProduts.join();
        // this.pickup.quantity = this.markedProduts.length;
        this.deleteTarget = consignmentId;
        this.modalService.open(id);

    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    checkConsignments(e, uid: string) {
        if (e.target.checked) {
            this.markedProducts.push(uid);
        } else {
            this.markedProducts.splice(this.markedProducts.indexOf(uid), 1);
        }

        this.hasCheck = (this.markedProducts.length > 0);
        this.confirmProducts = this.getConfirmedProducts();
    }
    getConfirmedProducts() {
        return this.products
            .filter(product => {
                const hasData = this.markedProducts.indexOf(product.uid);

                return hasData !== -1;
            });
    }

    addressList(): void {
        this.location
            .addresses()
            .subscribe(
                response => {
                    this.addresses = response.addresses;
                },
                err => {
                    console.log(err);
                }
            );
    }

    public selectedDate(value: any, datepicker?: any) {
        // any object can be passed to the selected event and it will be passed back here
        this.pickup.request_date = value.end.format('YYYY-MM-DD');
    }

    add(): void {
        this.pickupService
            .create(this.pickup)
            .subscribe(
                response => {
                    this.router.navigateByUrl('/consignment/confirm');
                },
                err => {
                    console.log(err);
                    this.hasError = err.error.error.message;
                }
            );
    }

    delete(id): void {
        this.deliveryService
            .destroy(id)
            .subscribe(
                response => {
                    this.products = this.products.filter(item => item.uid !== id);
                }
            );
    }

    downloadCsv(): void {
        if (this.confirmProducts.length < 1) {
            alert('Please select a consignment');
            return;
        }

        // Process Data
        const columns = ['invoice', 'customer_name', 'customer_collectible', 'status_delivery'];

        let data = columns.toString() + '\n';

        this.confirmProducts.forEach(function (consignment) {
            const tempRowData = [];

            tempRowData.push(consignment.uid);
            tempRowData.push(consignment.customer.name);
            tempRowData.push(consignment.customer_collectible);
            tempRowData.push(consignment.status_delivery);

            data += tempRowData.toString() + '\n';
        });

        // Generate and download CSV
        const blob = new Blob([data]);

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, 'Tiktok_consignments_draft.csv');
        } else {
            const a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'Tiktok_consignments_draft.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
                <title>Product Tags Print</title>
                <style>
                    * { margin: 0; padding: 0; }
                    body {
                        font: 14px/1.4 Helvetica, Arial, sans-serif;
                    }
                    #page-wrap { width: 100%;  margin: 0 auto; padding:20px 20px;}
                    #page-wrap > div{ float:left; height: 435px;}
                    #meta { margin-top: 1px; width: 100%; float: right; margin-bottom:10px;}
                    #meta tr td { text-align: right; }
                    #customer{
                        color: rgba(10, 10, 10, 0.91);
                    }
                    .footer{
                        bottom: 0;
                        position: fixed;
                        width: 100%;
                        text-align:center;
                    }
                    .merchant-details{
                        border:0;
                        margin:5px 8px;;
                        margin-top: 20px;
                        text-align:center;
                        font-size:10px;
                    }
                    #merchant-info {
                        border: 0;
                        margin: 5px 6px;
                        text-align: center;
                        width: 100%;
                        margin-bottom:2px;
                        font-size:10px;
                    }
                    .table{
                        padding:10px 20px;
            
                    }
                    #condition {
                        text-align:center;
                        font-size:12px;
                        border:1px solid #000;
                        border-collapse: collapse;
            
                    }
                    #condition tr td{
                        padding: 5px 4px;
                        width:20%;
                        font-weight: 600;
                    }
                    #condition tr td:first-child{
                        border-right: 1px solid #000;
                        margin-right: -20px;
                    }
                    .checkbox {
                        margin:0;
                        vertical-align: top;
                        border:1px;
                        margin-left:9px;
                        font-size:7.5px;
                        overflow: hidden;
                    }
                    .bar-code{
                        margin:10px;
                        width:135px;
                        height:60px;
                        margin-left:40px;
                        padding: 5px 8px;
                        border: 1px solid black;
                    }
                    .box {
                        float: left;
                        width:1px;
                        height:1px;
                        margin-left:2px;
                        margin-top: 1px;
                        padding: 5px  5px;
                        border: 1px solid black;
                        margin-bottom:10px;
                    }
                    .box2{
                        float:left;
                        margin:3px 2px;
            
                    }
                    #address{
                        padding:5px 8px;
                        text-align:center;
                        font-size:9px;
                    }
                    .consignment-tags {
                        float: left;
                        border: 1px solid #000;
                        width: 242px;
                        padding: 20px 0;
                        height: 448px;
                    }

                    @media print
                    {
                        .no-print, .no-print *
                        {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div id="page-wrap">
                ${printContents}
                </div>
            </body>
            </html>`
        );
        popupWin.document.close();

        // <body onload="window.print(); window.close()">
    }
}
