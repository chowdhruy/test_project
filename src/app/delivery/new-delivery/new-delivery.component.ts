import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {Consignment} from '../../models/consignment';
import {ConsignmentForm} from '../../models/consignment-form';
import {ConsignmentService} from '../../services/consignment.service';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-new-delivery',
  templateUrl: './new-delivery.component.html',
  styleUrls: ['./new-delivery.component.css']
})

export class NewDeliveryComponent implements OnInit {
  public daterange: any = {};
  public options: any = {
    singleDatePicker: true,
    showDropdowns: true
  };
  consignmentId = null;
  districts = [];
  areas = [];
  plans = [];
  services = [];
  hasError = false;
  @Input() product: ConsignmentForm = {
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_address: '',
    customer_district_id: null,
    customer_district_area_id: null,
    service_company_id: null,
    customer_collectible: 0,
    order_id: '',
    plan: '',
    package_details: '',
    delivery_date: '',
    delivery_slot: '',
    merchant_instruction: '',
  };

  products: Consignment[];
  submitted = false;
  params;

  constructor(private deliveryService: ConsignmentService,
              private locationService: LocationService,
              private router: Router,
              private route: ActivatedRoute,
              public ngProgress: NgProgress) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.districtList();

    // if (typeof this.params.id != 'undefined') {
    if (this.params.hasOwnProperty('id')) {
      this.getConsignment(this.params.id);
      this.consignmentId = this.params.id;
    }
  }

  public selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    this.product.delivery_date = value.end.format('YYYY-MM-DD');
  }

  add(): void {
    this.ngProgress.start();
    this.deliveryService
      .create(this.product)
      .subscribe(
        response => {
          this.ngProgress.done();
          this.router.navigateByUrl('/consignment');
        },
        err => {
          this.hasError = err.error.error.message;
          this.ngProgress.done();
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

  areaList(): void {
    this.locationService
      .areas(this.product.customer_district_id)
      .subscribe(
        response => {
          this.areas = response.areas;
        },
        err => {
          console.log(err);
        }
      );
  }

  onChangeArea(): void {
    this.planList();
    this.serviceList();
  }

  planList(): void {
    this.locationService
      .plans(this.product.customer_district_area_id)
      .subscribe(
        response => {
          this.plans = response.plans;
        },
        err => {
          console.log(err);
        }
      );
  }

  serviceList(): void {
    this.locationService
      .services(this.product.customer_district_area_id)
      .subscribe(
        response => {
          this.services = response.services;
        },
        err => {
          console.log(err);
        }
      );
  }

  getConsignment(consignmentId): void {
    this.deliveryService
      .show(consignmentId)
      .subscribe(
        response => {
          this.product.customer_name = response.consignment.customer.name;
          this.product.customer_phone = response.consignment.customer.phone;
          this.product.customer_email = response.consignment.customer.email;
          this.product.customer_address = response.consignment.customer.address;
          this.product.customer_collectible = response.consignment.customer_collectible;
          this.product.package_details = response.consignment.package_details;
          this.product.customer_district_area_id = response.consignment.customer.area.id;
          this.product.delivery_date = response.consignment.date_delivery;
          this.product.customer_district_id = response.consignment.customer.district.id;
          this.product.order_id = response.consignment.order_label;
          this.product.merchant_instruction = response.consignment.merchant_instruction;

          this.areaList();
          this.onChangeArea();

          this.product.service_company_id = response.consignment.service.id;
          this.product.plan = response.consignment.plan + '::' + response.consignment.weight;
        },
        err => {
          console.log(err);
        }
      );
  }

  updateConsignment(): void {
    this.deliveryService
      .update(this.params.id, this.product)
      .subscribe(
        response => {
          this.router.navigateByUrl('/consignment');
        },
        err => {
          this.hasError = err.error.error.message;
        }
      );
  }
}
