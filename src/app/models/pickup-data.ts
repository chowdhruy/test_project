/**
 * Created by Sovon on 11/9/2017.
 */

import {Pickup} from './pickup';
import {Pagination} from './pagination';

export interface PickupData {
    pickup: Pickup;
    pickups: Pickup[];
    pagination: Pagination;
}
