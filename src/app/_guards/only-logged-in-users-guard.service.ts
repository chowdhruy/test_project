import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UtilsService} from '../_services/utils.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router,
                private utils: UtilsService) {
    }

    canActivate() {
        if (!this.auth.isTokenExpired()) {
            return true;
        }

        this.auth.removeUser();
        window.location.href = '/login';
        return false;
    }
}
