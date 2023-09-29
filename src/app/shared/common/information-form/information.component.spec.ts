import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsInformationComponent } from './information.component';

describe('FieldsInformationComponent', () => {
  let component: FieldsInformationComponent;
  let fixture: ComponentFixture<FieldsInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldsInformationComponent]
    });
    fixture = TestBed.createComponent(FieldsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
