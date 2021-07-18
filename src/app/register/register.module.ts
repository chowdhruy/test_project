import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../_modules/shared.module';

const registerRoutes = [
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        RouterModule.forChild(registerRoutes),
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [],
})

export class RegisterModule {
}
