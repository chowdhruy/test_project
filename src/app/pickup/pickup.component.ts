import {Component, OnInit, Input} from '@angular/core';
import {PickupService} from '../services/pickup.service';
import {Router} from '@angular/router';
import {Pickup} from '../models/pickup';
import {PickupForm} from '../models/pickup-form';
import {LocationService} from '../services/location.service';

@Component({
    selector: 'app-pickup',
    templateUrl: './pickup.component.html',
    styleUrls: ['./pickup.component.css']
})

export class PickupComponent implements OnInit {

    public daterange: any = {};

    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
        singleDatePicker: true,
        showDropdowns: true
    };

    addresses = [];
    hasError = false;

    @Input() pickup: PickupForm = {
        address_id: null,
        request_date: '',
        quantity: 0,
        consignments: '',
        timeFrame: null,
        notes: ''
    };

    pickups: Pickup[];
    submitted = false;
    timeFrames = [];

    constructor(private pickupService: PickupService,
                private location: LocationService,
                private router: Router) {
    }

    ngOnInit() {
        this.getPickups();
        this.addressList();
    }

    getPickups(): void {
        this.pickupService
            .list()
            .subscribe(
                response => {
                    this.pickups = response.pickups;
                }
            );
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
                    this.hasError = err.error.error.message;
                }
            );
    }
}
