import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router, NavigationEnd} from '@angular/router';
import {UserRegBasic} from '../models/user-reg-basic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgProgress} from 'ngx-progressbar';
import {GeneralService} from '../services/general.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    private userBasic: UserRegBasic;
    signUpBasic: FormGroup;
    signUpFull: FormGroup;
    enableFullForm = 0;
    hasError = false;
    banks = [];

    constructor(
        private auth: AuthService,
        private general: GeneralService,
        private router: Router,
        private renderer: Renderer2,
        public ngProgress: NgProgress
    ) {
        const that = this;

        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    if (this.router.url === '/register') {
                        that.renderer.addClass(document.body, 'page-body');
                        that.renderer.addClass(document.body, 'login-page');
                        that.renderer.addClass(document.body, 'login-light');

                        that.displayElement();
                    } else {
                        that.renderer.removeClass(document.body, 'page-body');
                        that.renderer.removeClass(document.body, 'login-page');
                        that.renderer.removeClass(document.body, 'login-light');
                    }
                }
            });

        window.addEventListener('load', function () {
            that.displayElement();
        });
    }

    private displayElement(): void {
        const that = this;
        const elements = document.getElementsByClassName('fade-in-effect');

        setTimeout(function () {
            Array.from(elements).forEach(function (element) {
                that.renderer.addClass(element, 'in');
            });
        }, 1000);
    }

    get username() { return this.signUpBasic.get('username'); }
    get password() { return this.signUpFull.get('password'); }
    get token() { return this.signUpFull.get('token'); }
    get merchantName() { return this.signUpFull.get('merchantName'); }
    get businessName() { return this.signUpFull.get('businessName'); }
    get pickupAddress() { return this.signUpFull.get('pickupAddress'); }
    get phoneNumber() { return this.signUpFull.get('phoneNumber'); }
    get facebook() { return this.signUpFull.get('facebook'); }
    get website() { return this.signUpFull.get('website'); }
    get bankName() { return this.signUpFull.get('bankName'); }
    get bankAcNumber() { return this.signUpFull.get('bankAcNumber'); }
    get bankUserName() { return this.signUpFull.get('bankUserName'); }
    get walletType() { return this.signUpFull.get('walletType'); }
    get walletNumber() { return this.signUpFull.get('walletNumber'); }
    get reference() { return this.signUpFull.get('reference'); }

    ngOnInit() {
        this.signUpBasic = new FormGroup ({
            username: new FormControl('', Validators.required)
        });

        this.signUpFull = new FormGroup ({
            password: new FormControl('', Validators.required),
            token: new FormControl('', Validators.required),
            merchantName: new FormControl('', Validators.required),
            businessName: new FormControl('', Validators.required),
            pickupAddress: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            facebook: new FormControl('', Validators.required),
            website: new FormControl(''),
            bankName: new FormControl(''),
            bankAcNumber: new FormControl(''),
            bankUserName: new FormControl(''),
            walletType: new FormControl(''),
            walletNumber: new FormControl(''),
            reference: new FormControl(''),
        });

        this.bankList();
    }

    public onBasicRegistration() {
        if (this.signUpBasic.valid) {
            this.userBasic = this.signUpBasic.value;
            this.ngProgress.start();
            this.auth
                .verify(this.userBasic.username)
                .subscribe(
                    response => {
                        this.displayElement();
                        this.enableFullForm = 1;
                        this.renderer.setStyle(document.body, 'padding', '30px');
                        this.hasError = false;
                        this.ngProgress.done();
                    },
                    err => {
                        this.hasError = err.error.error.message;
                        this.ngProgress.done();
                    }
                );
        }
    }
    public onFullRegistration() {
        if (this.signUpFull.valid) {
            this.userBasic = this.signUpFull.value;
            this.userBasic.username = this.signUpBasic.value.username;

            this.ngProgress.start();

            this.auth
                .register(this.userBasic)
                .subscribe(
                    response => {
                        this.enableFullForm = 2;

                        this.ngProgress.done();
                    },
                    err => {
                        this.hasError = err.error.error.message;

                        this.ngProgress.done();
                    }
                );

            this.ngProgress.done();
        }
    }
    bankList(): void {
        this.general
            .banks()
            .subscribe(
                response => {
                    this.banks = response.banks;
                },
                err => {
                    console.log(err);
                }
            );
    }
}
