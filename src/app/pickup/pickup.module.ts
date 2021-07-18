import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import {Daterangepicker} from 'ng2-daterangepicker';
import {PickupComponent} from './pickup.component';

const deliveryRoutes = [
    {
        path: 'pickup',
        component: PickupComponent,
        canActivate: [
            OnlyLoggedInUsersGuard
        ]
    }
];

@NgModule({
    declarations: [
        PickupComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        RouterModule.forChild(deliveryRoutes),
        FormsModule,
        Daterangepicker
    ],
    providers: []
})

export class PickupModule {
}
