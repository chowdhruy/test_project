/* Core & Package Modules */
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './auth/token.interceptor';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {NgProgressModule} from 'ngx-progressbar';

/* Modules */
import {DashboardModule} from './dashboard/dashboard.module';
import {DeliveryModule} from './delivery/delivery.module';
import {PickupModule} from './pickup/pickup.module';
import {ConsignmentModule} from './consignment/consignment.module';
import {NotificationModule} from './notification/notification.module';

import {BillingModule} from './billing/billing.module';
import {TrackingModule} from './tracking/tracking.module';
import {PickupListModule} from './pickup-list/pickup-list.module';
import {ProfileModule} from './merchant-profile/profile.module';
import {RegisterModule} from './register/register.module';
import {LoginModule} from './login/login.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {ModalModule} from './_modules/modal.module';
/* Components */
import {AppComponent} from './app.component';
import {LogoutComponent} from './logout/logout.component';

/* Services */
import {PickupService} from './services/pickup.service';
import {ConsignmentService} from './services/consignment.service';
import {LocationService} from './services/location.service';
import {AuthService} from './services/auth.service';
import {GeneralService} from './services/general.service';
import {OnlyLoggedInUsersGuard} from './_guards/only-logged-in-users-guard.service';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {SharedModule} from './_modules/shared.module';
import { AngularFireModule } from 'angularfire2';
import { MessagingService } from './services/messaging.service';
import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { BillingNotificationComponent } from './billing-notification/billing-notification.component';

const appRoutes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        LogoutComponent,
        ChangePasswordComponent,
        NotFoundComponent,
        BillingNotificationComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:4200', 'http://merchant.tiktok.com.bd']
            }
        }),
        NgProgressModule,
        BrowserAnimationsModule,
        ConsignmentModule,
        BillingModule,
        TrackingModule,
        DeliveryModule,
        PickupModule,
        PickupListModule,
        DashboardModule,
        ProfileModule,
        LoginModule,
        RegisterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        SharedModule,
        NotificationModule,
    ],
    providers: [
        Title,
        PickupService,
        ConsignmentService,
        LocationService,
        MessagingService,
        InMemoryDataService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        OnlyLoggedInUsersGuard,
        GeneralService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
