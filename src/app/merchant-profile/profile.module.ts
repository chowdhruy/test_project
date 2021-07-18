import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MerchantProfileComponent} from './merchant-profile.component';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import {ProfileService} from '../services/profile.service';

const merchantProfileRoutes = [
    {
        path: 'profile',
        component: MerchantProfileComponent,
        canActivate: [
            OnlyLoggedInUsersGuard
        ]
    }
];

@NgModule({
    declarations: [
        MerchantProfileComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(merchantProfileRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    providers: [
        ProfileService
    ]
})

export class ProfileModule {
}
