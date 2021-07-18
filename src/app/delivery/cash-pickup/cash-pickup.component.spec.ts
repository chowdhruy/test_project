import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPickupComponent } from './cash-pickup.component';

describe('CashPickupComponent', () => {
  let component: CashPickupComponent;
  let fixture: ComponentFixture<CashPickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashPickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
