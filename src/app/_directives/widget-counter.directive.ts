import {Directive, AfterViewInit, OnChanges, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[appWidgetCounter]'
})
export class WidgetCounterDirective implements AfterViewInit, OnChanges {

    private _timer: any;
    private _display: string;
    private _duration = 2;
    private _countTo: number;
    private _countFrom: number;
    private _step = 100;
    private _target: any;

    constructor(private el: ElementRef) {
    }

    @Input()
    set countDisplay(display: string) {
        this._display = display;
    }

    @Input()
    set countFrom(from: string) {
        this._countFrom = parseFloat(from);
    }

    @Input()
    set countTo(to: string) {
        this._countTo = parseFloat(to);
    }

    @Input()
    set countDuration(duration: string) {
        if (duration !== undefined) {
            this._duration = parseFloat(duration);
        }

        this._duration = this._duration * 1000;
    }

    @Input()
    set countStep(step: string) {
        this._step = parseFloat(step);

        if (step === undefined || parseInt(step, 10) <= 0) {
            this._step = 100;
        }
    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes) {
        this._target = this.el.nativeElement.querySelector(this._display);

        this.run();
    }

    run(): boolean {
        const _this = this;

        clearInterval(this._timer);

        if (isNaN(this._duration)) {
            return false;
        }

        if (isNaN(this._step)) {
            return false;
        }

        if (isNaN(this._countFrom)) {
            return false;
        }

        if (isNaN(this._countTo)) {
            return false;
        }

        if (this._step <= 0) {
            console.log('Step must be greater than 0.');

            return false;
        }

        if (this._duration <= 0) {
            console.log('Duration must be greater than 0.');

            return false;
        }

        if (this._step > this._duration) {
            console.log('Step must be equal or smaller than duration.');

            return false;
        }

        let intermediate = this._countFrom;
        let increment = Math.abs(this._countTo - this._countFrom) / ((this._duration) / this._step);

        if (increment > 0 && increment < 1) {
            increment = 1;
        } else {
            increment = Math.trunc(increment);
        }

        this.printData(intermediate);

        this._timer = setInterval(function () {
            if (_this._countTo < _this._countFrom) {
                if (intermediate <= _this._countTo) {
                    clearInterval(_this._timer);
                    _this.printData(_this._countTo);
                } else {
                    _this.printData(intermediate);
                    intermediate -= increment;
                }
            } else {
                if (intermediate >= _this._countTo) {
                    clearInterval(_this._timer);
                    _this.printData(_this._countTo);
                } else {
                    _this.printData(intermediate);
                    intermediate += increment;
                }
            }
        }, this._step);
    }

    private printData(data): void {
        $(this._target).html(data);
    }
}
