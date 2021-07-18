import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Consignment} from '../models/consignment';
import {ConsignmentService} from '../services/consignment.service';
import {ModalService} from '../_services';

@Component({
    selector: 'app-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

    public activeTab = 'all';
    public daterangeInput = 'Filter By Date';
    public daterange: any = {};

    public query: string = null;
    public dateStart: string = null;
    public dateEnd: string = null;
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

    public consignment: Consignment;
    public checkedProducts: Consignment[];

    constructor(private deliveryService: ConsignmentService,
                private modalService: ModalService) {
    }

    ngOnInit() {
    }

    public changeTrackingTab(activeTab) {
        this.activeTab = activeTab;
    }

    public selectedDate(value: any) {
        this.dateStart = this.daterange.start = value.start;
        this.dateEnd = this.daterange.end = value.end;
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

    public checkedConsignments($event) {
        this.checkedProducts = $event;
    }

    // Consignment modal view
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
    // End of Consignment modal view

    // Download CSV
    downloadCsv(): void {
        if (this.checkedProducts.length < 1) {
            alert('Please select a consignment');
            return;
        }

        // Process Data
        const columns = ['invoice', 'customer_name', 'customer_collectible', 'status_delivery'];

        let data = columns.toString() + '\n';

        this.checkedProducts.forEach(function (consignment) {
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
            a.download = 'filename.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    // Print Label
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
