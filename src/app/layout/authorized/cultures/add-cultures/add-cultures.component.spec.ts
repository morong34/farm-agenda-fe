import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCulturesComponent } from './add-cultures.component';

describe('AddCulturesComponent', () => {
  let component: AddCulturesComponent;
  let fixture: ComponentFixture<AddCulturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddCulturesComponent],
    });
    fixture = TestBed.createComponent(AddCulturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
