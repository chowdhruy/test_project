import { Component, OnInit } from '@angular/core';
import {ModalService} from '../_services';
import {Consignment} from '../models/consignment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {

    public activeTab = 'draft';

    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
        singleDatePicker: true,
        showDropdowns: true,
    };

    public checkedProducts: Consignment[];

    public query: string = null;

    private bodyText: string;

    constructor(private modalService: ModalService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log(params); // Print the parameter to the console.
        });
    }

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
    }

    public changeConsignmentTab(activeTab) {
        this.activeTab = activeTab;
    }

    public calendarCanceled(e: any) {

        console.log(e);
        // e.event
        // e.picker
    }
    public checkedConsignments($event) {
        this.checkedProducts = $event;
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

}
