import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import 'bootstrap-datepicker';

@Directive({
    selector: '[appMyDatePicker]'
})
export class MyDatePickerDirective implements AfterViewInit {

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        $(this.el.nativeElement).datepicker();
    }
}
