/**
 * Created by Shafiq chowdhury on 3/12/2018.
 */

import {Items} from './payment_items';

export interface Payment {
    uid: string;
    invoice_number: string;
    amount: number;
    method: string;
    instrument_details: '';
    payment_date: string;
    items: Items[];
}
