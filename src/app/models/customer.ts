/**
 * Created by Sovon on 11/9/2017.
 */

import {District} from './district';
import {Area} from './area';

export interface Customer {
    name: string;
    phone: string;
    address: string;
    email: string;
    district: District;
    area: Area;
}
