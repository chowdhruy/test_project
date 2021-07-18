import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {LocationService} from '../services/location.service';
import {GeneralService} from '../services/general.service';
import {ProfileService} from '../services/profile.service';
import {Profile} from '../models/profile';
import {NgProgress} from 'ngx-progressbar';

@Component({
    selector: 'app-merchant-profile',
    templateUrl: './merchant-profile.component.html',
    styleUrls: ['./merchant-profile.component.css']
})
export class MerchantProfileComponent implements OnInit {
    banks = [];
    areas = [];
    districts = [];
    contactError = false;
    businessError = false;
    profileError = false;
    paymentError = false;
    success: any = false;
    profile: Profile;

    public myForm: FormGroup;
    public businessForm: FormGroup;
    public paymentForm: FormGroup;
    public contactForm: FormGroup;

    constructor(private location: LocationService,
                private general: GeneralService,
                private locationService: LocationService,
                private profileService: ProfileService,
                private _fb: FormBuilder,
                public ngProgress: NgProgress) {
    }

    ngOnInit() {
        this.getProfile();
        this.bankList();
        this.districtList();
        this.areaList();

        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            uid: [''],
            first_name: [''],
            last_name: [''],
            email: [''],
            phone: [''],
            date_of_birth: [''],
            gender: [''],
            marital_status: [''],
            country: [''],
            city: [''],
            address_01: [''],
            address_02: [''],
            postal_code: [''],
            is_approved: [''],
        });

        this.businessForm = this._fb.group({
            business_info: this.initBusinessInfo(),
            pickup_addresses: this._fb.array([])
        });
        this.paymentForm = this._fb.group({
            payment_methods: this._fb.array([]),
        });
        this.contactForm = this._fb.group({
            contact_info: this.initContactInfo(),
        });
    }

    initBusinessInfo() {
        return this._fb.group({
            business_name: [''],
            business_phone: [''],
            website: [''],
            facebook: [''],
        });
    }

    initContactInfo() {
        return this._fb.group({
            primary_contact: [''],
            primary_email: [''],
            primary_phone: [''],
            alternate_contact: [''],
            alternate_email: [''],
            alternate_phone: [''],
        });
    }

    initPaymentMethods() {
        return this._fb.group({
            account_name: [''],
            account_number: [''],
            branch_name: [''],
            id: [''],
            is_preferred: [''],
            method: [''],
            name: [''],
        });
    }

    initPickupAddresses() {
        return this._fb.group({
            id: [''],
            address: [''],
            district_id: [''],
            district_area_id: [''],
        });
    }

    addPaymentMethod() {
        const control = <FormArray>this.paymentForm.controls['payment_methods'];
        control.push(this.initPaymentMethods());
    }

    addPickupAddress() {
        const control = <FormArray>this.businessForm.controls['pickup_addresses'];
        control.push(this.initPickupAddresses());
    }

    removePaymentMethod(i: number) {
        const control = <FormArray>this.paymentForm.controls['payment_methods'];
        control.removeAt(i);
    }

    removePickupAddress(i: number) {
        const control = <FormArray>this.businessForm.controls['pickup_addresses'];
        control.removeAt(i);
    }

    onSubmit($type = null) {
        if ($type === 'payment') {
            if (this.paymentForm.valid) {
                this.ngProgress.start();
                this.cleanMessages();

                this.profileService
                    .update(this.paymentForm.value)
                    .subscribe(
                        response => {
                            this.success = 'Successfully updated payment info';
                            this.ngProgress.done();
                        },
                        err => {
                            this.paymentError = err.error.error.message;
                            this.ngProgress.done();
                        }
                    );
            }
        }

        if ($type === 'business') {
            if (this.businessForm.valid) {
                this.ngProgress.start();
                this.cleanMessages();

                this.profileService
                    .update(this.businessForm.value)
                    .subscribe(
                        response => {
                            this.success = 'Successfully updated business info';
                            this.ngProgress.done();
                        },
                        err => {
                            this.businessError = err.error.error.message;
                            this.ngProgress.done();
                        }
                    );
            }
        }

        if ($type === 'profile') {
            if (this.myForm.valid) {
                this.ngProgress.start();
                this.cleanMessages();

                this.profileService
                    .update(this.myForm.value)
                    .subscribe(
                        response => {
                            this.success = 'Successfully updated Owner info';
                            this.ngProgress.done();
                        },
                        err => {
                            this.profileError = err.error.error.message;
                            this.ngProgress.done();
                        }
                    );
            }
        }

        if ($type === 'contact') {
            if (this.contactForm.valid) {
                this.ngProgress.start();
                this.cleanMessages();

                this.profileService
                    .update(this.contactForm.value)
                    .subscribe(
                        response => {
                            this.success = 'Successfully updated contact info';
                            this.ngProgress.done();
                        },
                        err => {
                            this.contactError = err.error.error.message;
                            this.ngProgress.done();
                        }
                    );
            }
        }
    }

    private cleanMessages(): void {
        this.success = false;
        this.businessError = false;
        this.profileError = false;
        this.paymentError = false;
        this.contactError = false;
    }

    bankList(): void {
        this.general
            .banks()
            .subscribe(
                response => {
                    this.banks = response.banks;
                },
                err => {
                    console.log(err);
                }
            );
    }

    areaList(): void {
        this.locationService
            .areas()
            .subscribe(
                response => {
                    this.areas = response.areas;
                },
                err => {
                    console.log(err);
                }
            );
    }

    districtList(): void {
        this.locationService
            .districts()
            .subscribe(
                response => {
                    this.districts = response.districts;
                },
                err => {
                    console.log(err);
                }
            );
    }

    getProfile(): void {
        this.profileService
            .show()
            .subscribe(
                response => {
                    const profile = response.profile;

                    for (let i = 0; i < profile.payment_methods.length; i++) {
                        this.addPaymentMethod();
                    }

                    for (let i = 0; i < profile.pickup_addresses.length; i++) {
                        this.addPickupAddress();
                    }
                    this.myForm.patchValue(response.profile);
                    this.businessForm.patchValue(response.profile);
                    this.paymentForm.patchValue(response.profile);
                    this.contactForm.patchValue(response.profile);
                },
                err => {
                    console.log(err);
                }
            );
    }

    get formPickupAddress() {
        return <FormArray>this.businessForm.get('pickup_addresses');
    }

    get formPaymentMethods() {
        return <FormArray>this.paymentForm.get('payment_methods');
    }
}
