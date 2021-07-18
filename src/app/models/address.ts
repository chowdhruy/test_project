/**
 * Created by Shafiq on 1/8/2018.
 */
import {District} from './district';
import {Area} from './area';

export interface Address {
     id:number;
     address:string;
     district:District;
     area:Area;

}
