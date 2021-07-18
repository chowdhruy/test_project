import {Component, OnInit} from '@angular/core';
import 'bootstrap-daterangepicker';
import {ModalService} from '../_services';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-pickup-list',
    templateUrl: './pickup-list.component.html',
    styleUrls: ['./pickup-list.component.css']
})

export class PickupListComponent implements OnInit {

    public bodyText: string;

    constructor(private modalService: ModalService) {
    }

    csvData: any[] = [];

    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
}

