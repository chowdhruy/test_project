/**
 * Created by Sovon on 11/9/2017.
 */

import {User} from './user';

export interface History {
    ambassador: User;
    status: string;
    status_note: string;
    note: string;
    status_by: User;
    department: string;
}
