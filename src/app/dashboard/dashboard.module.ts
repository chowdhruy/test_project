import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardComponent} from './dashboard.component';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import {OverallService} from '../_services/overall.service';
import {SharedModule} from '../_modules/shared.module';

const dashboardRoutes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
            OnlyLoggedInUsersGuard
        ]
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(dashboardRoutes),
        FormsModule,
        NgbModule,
        SharedModule
    ],
    providers: [
        OverallService
    ]
})

export class DashboardModule {
}
