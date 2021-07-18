import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {PaymentData} from '../models/payment-data';
import {ConsignmentData} from "../models/consignment-data";
import {RequestMethod} from "@angular/http";

@Injectable()
export class PaymentService {

    private paymentUrl = 'merchants/payments';

    constructor(private http: HttpClient) {
    }

    list(query: any = {}): Observable<PaymentData> {
        query = this.serializeObj(query);

        const url = this.paymentUrl + '?' + query;

        return this.http
            .get<PaymentData>(url).map(
                response => response as PaymentData
            );
    }

    show(id: string): Observable<PaymentData> {
        const url = `${this.paymentUrl}/${id}`;
        return this.http
            .get<PaymentData>(url).map(
                response => response as PaymentData
            );
    }

    download(id: string): Observable<any> {
        const url = `${this.paymentUrl}/${id}/download`;

        return this.http
            .post(url, {}, {responseType: 'blob'}).map(
                response => response
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
