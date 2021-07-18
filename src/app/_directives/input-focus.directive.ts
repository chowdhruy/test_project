import {Directive, ElementRef, Renderer2, AfterViewInit, HostListener} from '@angular/core';

@Directive({
    selector: '[appInputFocus]'
})
export class InputFocusDirective implements AfterViewInit {
    private elem;
    private parent;

    constructor(private el: ElementRef,
                private renderer: Renderer2) {

        this.elem = el.nativeElement;
        this.parent = this.elem.parentElement;
    }

    ngAfterViewInit() {
    }

    @HostListener('focus') onFocus() {
        this.renderer.addClass(this.parent, 'is-focused');
    }

    @HostListener('keydown') onKeyDown() {
        this.renderer.addClass(this.parent, 'is-focused');
    }

    @HostListener('blur') onBlur() {
        this.renderer.removeClass(this.parent, 'is-focused');

        if (this.elem.value.trim().length > 0) {
            this.renderer.addClass(this.parent, 'is-focused');
        }
    }
}
