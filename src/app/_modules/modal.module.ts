import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from '../_directives';
import {ModalService} from '../_services';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent
    ],
    providers: [
        ModalService
    ],
    exports: [
        ModalComponent
    ]
})
export class ModalModule {
}
