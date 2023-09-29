import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarActionComponent } from './action-bar-action.component';

describe('ActionBarActionComponent', () => {
  let component: ActionBarActionComponent;
  let fixture: ComponentFixture<ActionBarActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBarActionComponent]
    });
    fixture = TestBed.createComponent(ActionBarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
