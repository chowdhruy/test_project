/**
 * Created by Shafiq on 11/9/2017.
 */
import {Consignment} from './consignment';
import {Ambassador} from './ambassador';

export interface Pickup {
    uid: string;
    quantity: number;
    address: string;
    request_date: string;
    receive_date: string;
    note: string;
    status: string;
    consignments: Consignment[];
    ambassador: Ambassador[];
}
