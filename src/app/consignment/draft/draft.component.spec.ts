import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftComponent } from './draft.component';

describe('ChildDraftConsignmentComponent', () => {
  let component: DraftComponent;
  let fixture: ComponentFixture<DraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
