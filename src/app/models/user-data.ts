/**
 * Created by Sovon on 11/9/2017.
 */
import {User} from '../models/user';

export interface UserData {
    user: User;
    name: string;
    phone: string;
    photo: string;
    token: string;
}
