import {Payment} from './payment'
import {Pagination} from './pagination';
export interface PaymentData {
        payment:Payment;
        payments: Payment[];
        pagination:Pagination;
}