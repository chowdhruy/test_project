import {Directive, AfterViewInit, ElementRef} from '@angular/core';
import '../../../node_modules/jquery-ui/ui/widget.js';
/*import '../../../node_modules/selectboxit/src/javascripts/jquery.selectBoxIt.js';*/

@Directive({
    selector: '[appSelectBoxIt]'
})
export class SelectBoxItDirective implements AfterViewInit {

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        /*$(this.el.nativeElement).selectBoxIt({
            showFirstOption: false
        }).on('open', function() {
            // Adding Custom Scrollbar
            $(this).data('selectBoxSelectBoxIt').list.perfectScrollbar();
        });*/
    }
}
