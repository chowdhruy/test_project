import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User;
    username: string;
    password: string;
    hasError = false;

    constructor(
        private auth: AuthService,
        private router: Router,
        private renderer: Renderer2,
        public ngProgress: NgProgress
    ) {
        const that = this;

        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    if (this.router.url === '/login') {
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

    ngOnInit() {
        this.auth.removeUser();
    }

    private displayElement(): void {
        const that = this;
        const elements = document.getElementsByClassName('fade-in-effect');

        setTimeout(function(){
            Array.from(elements).forEach(function(element) {
                that.renderer.addClass(element, 'in');
            });
        }, 1000);
    }

    login(): void {
        this.ngProgress.start();
        this.closeErrorAlert();

        this.auth
            .login(this.username, this.password)
            .subscribe(
                response => {
                    this.user = response.user;
                    this.auth.setUser(this.user);
                    // this.router.navigateByUrl('/dashboard');
                    window.location.href = '/dashboard';
                    this.ngProgress.done();
                },
                err => {
                    this.hasError = err.error.error.message;
                    this.ngProgress.done();
                }
            );
    }

    closeErrorAlert(): void {
        this.hasError = false;
    }
}
