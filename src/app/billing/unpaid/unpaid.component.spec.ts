import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidComponent } from './unpaid.component';

describe('UnpaidComponent', () => {
  let component: UnpaidComponent;
  let fixture: ComponentFixture<UnpaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
