import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {GeneralData} from '../models/general-data';

@Injectable()
export class LocationService {

    private url = 'merchants/general'; // URL to web api

    constructor(private http: HttpClient) {}

    divisions(): Observable<GeneralData> {
        const url = this.url + '?divisions=true';

        return this.http
            .get<GeneralData>(url).map(
                response => response as GeneralData
            );
    }

    districts(division_id: number = null): Observable<GeneralData> {
        let url = this.url + '?districts=true';

        if (division_id !== null) {
            url += '&division_id=' + division_id;
        }

        return this.http
            .get<GeneralData>(url).map(
                response => response as GeneralData
            );
    }

    areas(district_id: number = null): Observable<GeneralData> {
        let url = this.url + '?areas=true';

        if (district_id !== null) {
            url += '&district_id=' + district_id;
        }

        return this.http
            .get<GeneralData>(url).map(
                response => response as GeneralData
            );
    }

    services(area_id: number = null): Observable<GeneralData> {
        let url = this.url + '?services=true';

        if (area_id !== null) {
            url += '&area_id=' + area_id;
        }

        return this.http
            .get<GeneralData>(url).map(
                response => response as GeneralData
            );
    }

    plans(area_id: number = null): Observable<GeneralData> {
        let url = this.url + '?plans=true';

        if (area_id !== null) {
            url += '&area_id=' + area_id;
        }

        return this.http
            .get<GeneralData>(url).map(
                response => response as GeneralData
            );
    }

    addresses(): Observable<GeneralData>{
        const url = this.url + '?addresses=true';
     
        return this.http
            .get<GeneralData>(url).map(
                response => response as GeneralData
            );
    }
}
