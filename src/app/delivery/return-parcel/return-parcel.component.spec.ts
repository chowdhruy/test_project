import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnParcelComponent } from './return-parcel.component';

describe('ReturnParcelComponent', () => {
  let component: ReturnParcelComponent;
  let fixture: ComponentFixture<ReturnParcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnParcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
