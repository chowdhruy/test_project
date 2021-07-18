import {PickupAddress} from './pickup_addresses';
import {BusinessInfo} from './business_info';
import {PaymentMethods} from './payment_methods';

export interface Profile {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string;
    marital_status: string;
    country: string;
    city: string;
    address_01: string;
    address_02: string;
    postal_code: number;
    pickup_addresses: PickupAddress[];
    business_info: BusinessInfo;
    payment_methods: PaymentMethods[];
}
