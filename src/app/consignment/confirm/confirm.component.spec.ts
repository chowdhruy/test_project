import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildConfirmComponent } from './child-confirm.component';

describe('ChildConfirmComponent', () => {
  let component: ChildConfirmComponent;
  let fixture: ComponentFixture<ChildConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
