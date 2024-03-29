import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../services/payment.service';
import {Items} from '../models/payment_items';
import {Payment} from '../models/payment';
import {ActivatedRoute, Router} from '@angular/router';
@Component ({
  selector: 'app-billing-notification',
  templateUrl: './billing-notification.component.html',
  styleUrls: ['./billing-notification.component.css']
})
export class BillingNotificationComponent implements OnInit {
    public payment: Payment;
    params;
    items: Items[];
  constructor(private paymentService: PaymentService,
              private route: ActivatedRoute,
              private router: Router,

  ) { this.route. params.subscribe(params => this.params = params); }

  ngOnInit() {
    this.showPaymentDetails(this.params.id);
  }
  showPaymentDetails(paymentId: string): void {
      this.paymentService
          .show(paymentId)
          .subscribe(
              response => {
                  this.payment = response.payment;
              }
          );
  }

}
