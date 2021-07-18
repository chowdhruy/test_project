import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedComponent } from './returned.component';

describe('ReturnedComponent', () => {
  let component: ReturnedComponent;
  let fixture: ComponentFixture<ReturnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
