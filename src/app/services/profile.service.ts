import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProfileData} from '../models/Profile-data';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
    private profileUrl = 'merchants/profile';
    constructor(private http: HttpClient) {
    }

    show(): Observable<ProfileData> {
        const url = `${this.profileUrl}`;

        return this.http
            .get<ProfileData>(url).map(
                response => response as ProfileData
            );
    }

    update(profile: any): Observable<ProfileData> {
        const url = `${this.profileUrl}`;

        return this.http
            .put<ProfileData>(url, profile).map(
                response => {
                    return response as ProfileData;
                }
            );
    }
}
