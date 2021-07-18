import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

    @Input('size') size = 'sm-3';
    @Input('from') from = 0;
    @Input('target') target = 0;
    @Input('title') title = 0;
    @Input('classIcon') classIcon = 'fa-bar-chart-o';
    @Input('colorIcon') colorIcon = '#FFF';
    @Input('colorLabel') colorLabel = '#FFF';

    constructor() {
    }

    ngOnInit() {
    }

}
