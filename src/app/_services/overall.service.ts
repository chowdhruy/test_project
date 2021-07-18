import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {OverallData} from '../models/overall-data';

@Injectable()
export class OverallService {

    private url = 'merchants/overall'; // URL to web api

    constructor(private http: HttpClient) {
    }

    overallData(): Observable<OverallData> {
        const url = this.url;

        return this.http
            .get<OverallData>(url).map(
                response => response as OverallData
            );
    }
}
