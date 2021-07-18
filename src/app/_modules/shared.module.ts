import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFocusDirective} from '../_directives/input-focus.directive';
import {SelectBoxItDirective} from '../_directives/select-box-it.directive';
import {WidgetCounterDirective} from '../_directives/widget-counter.directive';
import {CounterComponent} from '../_directives/counter/counter.component';
import {UtilsService} from '../_services/utils.service';
import {StatusComponent} from '../_directives/status/status.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InputFocusDirective,
        SelectBoxItDirective,
        WidgetCounterDirective,
        CounterComponent,
        StatusComponent
    ],
    providers: [
        UtilsService
    ],
    exports: [
        InputFocusDirective,
        SelectBoxItDirective,
        WidgetCounterDirective,
        CounterComponent,
        StatusComponent
    ]
})
export class SharedModule {
}
