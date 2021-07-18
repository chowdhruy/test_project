import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OnlyLoggedInUsersGuard} from '../_guards/only-logged-in-users-guard.service';
import {NotificationComponent} from './notification.component';
const notificationRoutes = [
    {
        path: 'notification',
        component: NotificationComponent,
    }
];

@NgModule({
    declarations: [
        NotificationComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(notificationRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    providers: [
    ]
})

export class NotificationModule {
}