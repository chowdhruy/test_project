import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {DraftComponent} from './draft/draft.component';
import {ConsignmentComponent} from './consignment.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import {Daterangepicker} from 'ng2-daterangepicker';
import {PickupService} from '../services/pickup.service';
import {ModalModule} from '../_modules/modal.module';
import {ConsignmentsComponent} from './consignments/consignments.component';

const consignmentRoutes = [
    { path: 'consignment/:type', component: ConsignmentComponent, canActivate: [OnlyLoggedInUsersGuard] },
    { path: 'consignment', component: ConsignmentComponent, canActivate: [OnlyLoggedInUsersGuard] },
    { path: 'consignments/:id', component: ConsignmentsComponent, canActivate: [OnlyLoggedInUsersGuard] }
];

@NgModule({
    declarations: [
        ConsignmentComponent,
        DraftComponent,
        ConfirmComponent,
        ConsignmentsComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        RouterModule.forChild(consignmentRoutes),
        ModalModule,
        Daterangepicker,
        FormsModule
    ],
    providers: [
        PickupService,
    ]
})

export class ConsignmentModule {

}
