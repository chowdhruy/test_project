/**
 * Created by Sovon on 2/5/2017.
 */
import {Overview} from './overview';
import {Consignment} from './consignment';

export interface OverallData {
    overview: Overview;
    consignments: Consignment[];
}
