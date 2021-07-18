/**
 * Created by Sovon on 11/9/2017.
 */

import {Customer} from './customer';
import {Service} from './service';
import {History} from './history';

export interface Consignment {
    uid: string;
    customer_collectible: number;
    order_label: string;
    weight: string;
    package_details: string;
    merchant_instruction: string;
    type: string;
    is_conditional: boolean;
    status_delivery: string;
    date_delivery: string;
    status_pickup: string;
    customer: Customer;
    service: Service;
    delivery_counter: number;
    date_return: string;
    status_overall: string;
    status: string;
    plan: number;
    charge_delivery: number;
    charge_cod: number;
    charge_total: number;
    collected_total: number;
    status_return: string;
    histories: History[];
}
