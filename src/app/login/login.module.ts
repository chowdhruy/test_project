import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login.component';
import {SharedModule} from '../_modules/shared.module';

const loginRoutes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(loginRoutes),
        FormsModule,
        NgbModule,
        SharedModule
    ],
    providers: []
})

export class LoginModule {}
