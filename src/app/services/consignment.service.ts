import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ConsignmentData} from '../models/consignment-data';
import {ConsignmentForm} from '../models/consignment-form';

@Injectable()
export class ConsignmentService {

    private consignmentUrl = 'merchants/consignments';  // URL to web api

    constructor(private http: HttpClient) {}

    list(query: any = {}): Observable<ConsignmentData> {
        query = this.serializeObj(query);

        const url = this.consignmentUrl + '?' + query;

        return this.http
            .get<ConsignmentData>(url).map(
            response => response as ConsignmentData
        );
    }

    show(id: string): Observable<ConsignmentData> {
        const url = `${this.consignmentUrl}/${id}`;
        return this.http
            .get<ConsignmentData>(url).map(
                response => response as ConsignmentData
            );
    }

    destroy(id: number): Observable<ConsignmentData> {
        const url = `${this.consignmentUrl}/${id}`;
        return this.http
            .delete<ConsignmentData>(url).map(
                response => response as ConsignmentData
            );
    }

    create(consignment: ConsignmentForm): Observable<ConsignmentData> {
        return this.http
            .post<ConsignmentData>(this.consignmentUrl, consignment).map(
                response => response as ConsignmentData
            );
    }

    update(id: string, consignment: ConsignmentForm): Observable<ConsignmentData> {
        const url = `${this.consignmentUrl}/${id}`;

        return this.http
            .put<ConsignmentData>(url, consignment).map(
                response => response as ConsignmentData
            );
    }

    serializeObj(obj) {
        const result = [];

        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
            }
        }

        return result.join('&');
    }
}
