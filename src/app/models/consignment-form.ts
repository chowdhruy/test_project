/**
 * Created by Sovon on 11/9/2017.
 */

export interface ConsignmentForm {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string;
    customer_district_id: number;
    customer_district_area_id: number;
    service_company_id: number;
    customer_collectible: number;
    order_id: string;
    plan: string;
    package_details: string;
    delivery_date: string;
    delivery_slot: string;
    merchant_instruction: string;
}
