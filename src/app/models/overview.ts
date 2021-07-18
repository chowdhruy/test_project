/**
 * Created by Sovon on 2/5/2017.
 */

export interface Overview {
    total_sales: number;
    total_paid: number;
    total_shipping_cost: number;
    amount_uninvoiced: number;
    amount_unsettled: number;
    parcels_delivered: number;
    parcels_returned: number;
    parcels_pending: number;
}
