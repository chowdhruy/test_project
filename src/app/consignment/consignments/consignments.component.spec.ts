import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ConsignmentsComponent} from './consignments.component';

describe('TrackingStatusComponent', () => {
  let component: ConsignmentsComponent;
  let fixture: ComponentFixture<ConsignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
