/**
 * Created by Sovon on 11/9/2017.
 */
export class UserRegBasic {
    username: string;
    password: string;
    token: string;
    merchantName: string;
    businessName: string;
    pickupAddress: string;
    phoneNumber: string;
    facebook: string;
    website: string;
    bankName: string;
    bankAcNumber: string;
    bankUserName: string;
    walletType: string;
    walletNumber: string;
    reference: string;

    constructor(values: Object = {}) {
        // Constructor initialization
        Object.assign(this, values);
    }
}
