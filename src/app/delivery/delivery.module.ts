import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DeliveryComponent} from './delivery.component';
import {CashPickupComponent} from './cash-pickup/cash-pickup.component';
import {NewDeliveryComponent} from './new-delivery/new-delivery.component';
import {MyDatePickerDirective} from '../directives/my-date-picker.directive';
import {ExchangeComponent} from './exchange/exchange.component';
import {ReturnParcelComponent} from './return-parcel/return-parcel.component';
import {Daterangepicker} from 'ng2-daterangepicker';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';

const deliveryRoutes = [
    {
        path: 'delivery',
        component: DeliveryComponent,
        children: [
            {path: '', redirectTo: 'new-delivery', pathMatch: 'full'},
            {path: 'new-delivery/:id', component: NewDeliveryComponent, data: {title: 'New Delivery'}},
            {path: 'new-delivery', component: NewDeliveryComponent, data: {title: 'New Delivery'}},
            {path: 'exchange', component: ExchangeComponent, data: {title: 'Exchange'}},
            {path: 'return-parcel', component: ReturnParcelComponent, data: {title: 'Return Parcel'}},
            {path: 'cash-pickup', component: CashPickupComponent, data: {title: 'Cash Pickup'}},
        ],
        canActivate: [
            OnlyLoggedInUsersGuard
        ]
    }
];

@NgModule({
    declarations: [
        DeliveryComponent,
        CashPickupComponent,
        NewDeliveryComponent,
        MyDatePickerDirective,
        ExchangeComponent,
        ReturnParcelComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        Daterangepicker,
        RouterModule.forChild(deliveryRoutes),
        FormsModule,
    ],
    providers: []
})

export class DeliveryModule {
}
