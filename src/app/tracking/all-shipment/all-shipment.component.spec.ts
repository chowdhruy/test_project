import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShipmentComponent } from './all-shipment.component';

describe('AllShipmentComponent', () => {
  let component: AllShipmentComponent;
  let fixture: ComponentFixture<AllShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
