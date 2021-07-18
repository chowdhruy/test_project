import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupListComponent } from './pickup-list.component';

describe('PickupListComponent', () => {
  let component: PickupListComponent;
  let fixture: ComponentFixture<PickupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
