import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PickupListComponent} from './pickup-list.component';

import {ModalModule} from '../_modules/modal.module';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import { HttpModule, JsonpModule } from '@angular/http';

const pickupListRoutes = [
    {
        path: 'pickup-list',
        component: PickupListComponent,
        canActivate: [
            OnlyLoggedInUsersGuard
        ]
    },
];

@NgModule({
    declarations: [
        PickupListComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(pickupListRoutes),
        FormsModule,
        NgbModule,
        ModalModule,
        HttpModule
    ],
    providers: []
})

export class PickupListModule {
}
