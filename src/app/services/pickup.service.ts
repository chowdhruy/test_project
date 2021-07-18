import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {PickupForm} from '../models/pickup-form';
import {PickupData} from '../models/pickup-data';
import {Pickup} from '../models/pickup';

@Injectable()
export class PickupService {

    // private headers = new HttpHeaders().set('Authorization', 'my-auth-token');
    private pickupUrl = 'merchants/pickups';  // URL to web api

    constructor(private http: HttpClient) {
    }

    list(status:string =null, page:number=1): Observable<PickupData> {
        let url = this.pickupUrl + '?page=' + page;

         if(status !=null){
           url + '=&status=' +status;
         }
        return this.http
            .get<PickupData>(this.pickupUrl).map(
                response => response as PickupData
            );
    }

    show(id: string): Observable<PickupData> {
        const url = `${this.pickupUrl}/${id}`;
        return this.http
            .get<PickupData>(url).map(
                response => response as PickupData
            );
    }

    destroy(id: number): Observable<Pickup> {
        const url = `${this.pickupUrl}/${id}`;
        return this.http
            .delete<Pickup>(url).map(
                response => response['pickup'] as Pickup
            );
    }

    create(pickup: PickupForm): Observable<PickupData> {
        return this.http
            .post<PickupData>(this.pickupUrl, pickup).map(
                response => response as PickupData
            );
    }

    update(pickup: Pickup): Observable<Pickup> {
        const url = `${this.pickupUrl}/${pickup.uid}`;
        return this.http
            .put<Pickup>(url, pickup).map(
                response => response['pickup'] as Pickup
            );
    }

    /*private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }*/
}
