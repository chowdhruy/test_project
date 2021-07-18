import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingNotificationComponent } from './billing-notification.component';

describe('BillingNotificationComponent', () => {
  let component: BillingNotificationComponent;
  let fixture: ComponentFixture<BillingNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
