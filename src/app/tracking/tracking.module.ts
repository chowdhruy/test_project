import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {TrackingComponent} from './tracking.component';
import {AllShipmentComponent} from './all-shipment/all-shipment.component';
import {ProcessingComponent} from './processing/processing.component';
import {DeliveringComponent} from './delivering/delivering.component';
import {DeliveredComponent} from './delivered/delivered.component';
import {FailedComponent} from './failed/failed.component';
import {ReturnedComponent} from './returned/returned.component';
import {PendingComponent} from './pending/pending.component';
import {ModalModule} from '../_modules/modal.module';
import {SharedModule} from '../_modules/shared.module';

import {Daterangepicker} from 'ng2-daterangepicker';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';

const trackingRoutes = [
    {
        path: 'tracking',
        component: TrackingComponent,
        children: [],
        canActivate: [
            OnlyLoggedInUsersGuard
        ]
    }
];

@NgModule({
    declarations: [
        TrackingComponent,
        AllShipmentComponent,
        ProcessingComponent,
        DeliveringComponent,
        DeliveredComponent,
        FailedComponent,
        ReturnedComponent,
        PendingComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        Daterangepicker,
        ModalModule,
        FormsModule,
        RouterModule.forChild(trackingRoutes),
        SharedModule
    ],
    providers: [],

})

export class TrackingModule {
}
