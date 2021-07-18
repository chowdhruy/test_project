import {District} from './district';
import {Area} from './area';

export interface PickupAddress {
    id: number;
    address: string;
    nearest_hub_id: string;
    pickup_address_01: string;
    pickup_address_02: string;
    district_id: string;
    district_area_id: string;
    district: District;
    area: Area;
}
