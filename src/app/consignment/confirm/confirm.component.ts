import {Component, OnInit,Input} from '@angular/core';
import {PickupService} from '../../services/pickup.service';
import {Pickup} from '../../models/pickup';
import {Pagination} from '../../models/pagination';
import { ModalService } from '../../_services/index';
import {ConsignmentService} from '../../services/consignment.service';
@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
    private bodyText: string;
    page: number;
    total: number;
    pickups: Pickup[];
    pickup: Pickup;
    deleteTarget = null;
    pagination:Pagination;
    constructor(private pickupService: PickupService,
                private modalService: ModalService,
                ) {}

    ngOnInit() {
        this.getPickups();
        this.bodyText = 'This text can be updated in modal 1';
    }

    hasCheck = false;
    addresses =[];
    hasError = false;
    getPickups(page:number =1): void {
        this.pickupService
            .list('confirm',page)
            .subscribe(
                response => {
                    this.pickups = response.pickups;
                    this.pagination = response.pagination;
                }
            );
    }
   openModal(id: string, pickupId: string): void {
        this.pickupService
            .show(pickupId)
            .subscribe(
                response => {
                    this.pickup = response.pickup;      
                }    
            );

        this.modalService.open(id);
    }

    openDeleteAlert(id: string, consignmentId: string): void {
        this.deleteTarget = consignmentId;

        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

     public daterange: any = {};

    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
         singleDatePicker: true,
         showDropdowns: true
    }; 

    delete(id): void {
        this.pickupService
            .destroy(id)
            .subscribe(
                response => {
                    this.pickups = this.pickups.filter(item => item.uid !== id);
                }
            );
    }

}
