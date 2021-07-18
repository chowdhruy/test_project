import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

    constructor() {
    }

    isLoggedIn(): boolean {
        return !(localStorage.getItem('isLoggedIn') === null);
    }

    isApproved(): boolean {
        return Boolean(localStorage.getItem('isApproved'));
    }
}
