import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {PaidComponent} from './paid/paid.component';
import {BillingComponent} from './billing.component';
import {PaymentService} from '../services/payment.service';
import {UnpaidComponent} from './unpaid/unpaid.component';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import {Daterangepicker} from 'ng2-daterangepicker';
import {ModalModule} from '../_modules/modal.module';
import {SharedModule} from '../_modules/shared.module';
import { InvoicesComponent } from './invoices/invoices.component';

const billingRoutes = [
     {
        path: 'billing',
        component: BillingComponent,
        children: [],
        canActivate: [
            OnlyLoggedInUsersGuard
        ],
     },
      {
        path: 'invoices/:id',
        component: InvoicesComponent,
      }
];

@NgModule({
    declarations: [
        BillingComponent,
        PaidComponent,
        UnpaidComponent,
        InvoicesComponent,
        InvoiceDetailsComponent,
    ],
    imports: [
        NgbModule,
        BrowserModule,
        Daterangepicker,
        SharedModule,
        ModalModule,
        FormsModule,
        RouterModule.forChild(billingRoutes)
    ],
    providers: [PaymentService,]
})

export class BillingModule {
}
