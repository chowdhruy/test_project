/**
 * Created by Sovon on 11/9/2017.
 */
import {Service} from './service';
import {Plan} from './plan';
import {Area} from './area';
import {Bank} from './bank';
import {District} from './district';
import {Division} from './division';
import {Address} from './address';

export interface GeneralData {
    divisions: Division[];
    districts: District[];
    areas: Area[];
    services: Service[];
    plans: Plan[];
    banks: Bank[];
    addresses: Address[];
}
