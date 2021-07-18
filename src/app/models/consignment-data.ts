/**
 * Created by Sovon on 11/9/2017.
 */

import {Consignment} from './consignment';
import {Pagination} from './pagination';

export interface ConsignmentData {
    consignment: Consignment;
    consignments: Consignment[];
    pagination: Pagination;
}
