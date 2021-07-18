import {Component, OnInit} from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NgProgress} from 'ngx-progressbar';
import {AuthService} from './services/auth.service';
import {User} from './models/user';
import 'rxjs/add/operator/take';
import {UtilsService} from './_services/utils.service';
import { MessagingService } from './services/messaging.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import {Version} from './models/version';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    user: User;
    currentYear: number;
    displayRefreshPage = false;
    version: Version;
    // public onlineOffline: boolean = navigator.onLine;

    public constructor(
        private auth: AuthService,
        private titleService: Title,
        private router: Router,
        public ngProgress: NgProgress,
        private utils: UtilsService,
        public msg: MessagingService,

    ) {
        this.setRouterEvents();
        this.currentYear = (new Date()).getFullYear();

        /*window.addEventListener('online', () => {
            this.onlineOffline = true;
            console.log('true block', this.onlineOffline);
        });
        window.addEventListener('offline', () => {
            this.onlineOffline = false;
            console.log('false block', this.onlineOffline);
        });*/
    }

    ngOnInit() {
        this.loggedIn();
        this.getUser();
        this.getUser();

        this.checkVersion();

        // this.msg.getPermission(this.user);
        // this.msg.monitorRefresh(this.user);
        // this.msg.receiveMessages();
    }

    refreshPage() {
        localStorage.setItem('app_version', this.version.frontend);
        location.reload(true);
    }

    refreshClose() {
        this.displayRefreshPage = false;
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public loggedIn() {
        return this.utils.isLoggedIn();
    }

    public isApproved() {
        return this.utils.isApproved();
    }

    public getUser() {
        this.user = this.auth.getUser();
    }

    public setRouterEvents() {
        this.router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationStart) {
                this.ngProgress.start();
            }

            if (event instanceof NavigationEnd) {
                this.ngProgress.done();
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator
                // Present error to user
                console.log(event.error);
            }
        });
    }

    public checkVersion() {
        const that = this;

        this.auth
            .version()
            .subscribe(
                response => {
                    this.version = response;

                    const currentVersion = localStorage.getItem('app_version');

                    if (currentVersion !== this.version.frontend) {
                        that.displayRefreshPage = true;
                    }
                }
            );
    }
}
