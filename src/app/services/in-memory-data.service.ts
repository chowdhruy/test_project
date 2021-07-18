import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const pickups = [
            {id: 1, address: 'P72853', quantity: 5, notes: 'General Pickup P72853', status: 'initiated'},
            {id: 2, address: 'P72854', quantity: 4, notes: 'General Pickup P72854', status: 'accepted'},
            {id: 3, address: 'P72855', quantity: 2, notes: 'General Pickup P72855', status: 'on_the_way'},
            {id: 4, address: 'P72856', quantity: 8, notes: 'General Pickup P72856', status: 'picked_up'},
            {id: 5, address: 'P72857', quantity: 5, notes: 'General Pickup P72857', status: 'received'}
        ];

        const consignments = [
            {
                id: 1,
                uid: 'P01',
                name: 'Test',
                email: 'test@mail.com',
                number: '+801717646464',
                address: 'Dhaka',
                recipient_location: 'Dhaka',
                merchant_label: 'L001',
                recipient_zone: 'Uttara'
            }
        ];


        return {pickups, consignments};
    }
}
