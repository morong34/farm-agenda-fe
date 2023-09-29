import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCulturesComponent } from './form-cultures.component';

describe('FormCulturesComponent', () => {
  let component: FormCulturesComponent;
  let fixture: ComponentFixture<FormCulturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCulturesComponent]
    });
    fixture = TestBed.createComponent(FormCulturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
