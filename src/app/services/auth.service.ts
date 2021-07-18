import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserData} from '../models/user-data';
import {User} from '../models/user';
import {DataSuccess} from '../models/data-success';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {UserRegBasic} from '../models/user-reg-basic';
import * as jwt_decode from 'jwt-decode';
import {Version} from '../models/version';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
                private jwtHelperService: JwtHelperService) {
    }

    /*loggedIn(): boolean {
        const token: string = this.getToken();

        if (!token) {
            return false;
        }

        const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

        return !tokenExpired;
    }*/

    verify(username: string): Observable<DataSuccess> {
        const data = {
            username: username
        };

        return this.http
            .post<DataSuccess>('verify', data).map(
                response => response as DataSuccess
            );
    }

    login(username: string, password: string): Observable<UserData> {
        const data = {
            username: username,
            password: password,
            role: 'merchant'
        };

        return this.http
            .post<UserData>('login', data).map(
                response => response as UserData
            );
    }

    resetPassword(old_password: string, password: string, password_confirmation: string): Observable<UserData> {
        const data = {
            old_password: old_password,
            password: password,
            password_confirmation: password_confirmation
        };
        return this.http
            .post<UserData>('change-password', data).map(
                response => response as UserData
            );
    }

    setUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isApproved', user.is_approved.toString());
    }

    getUser(): User {
        let user = localStorage.getItem('currentUser');

        user = JSON.parse(user);
        const userObj: User = {
            id: '',
            name: '',
            phone: '',
            photo: '',
            token: '',
            is_approved: false
        };

        return Object.assign(userObj, user);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeUser(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isApproved');
    }

    register(user: UserRegBasic): Observable<UserData> {
        return this.http
            .post<UserData>('register-online', user).map(
                response => response as UserData
            );
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);

        if (date === undefined) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf());
    }

    version(): Observable<Version> {
        return this.http
            .get<Version>('versions').map(
                response => response as Version
            );
    }
}
