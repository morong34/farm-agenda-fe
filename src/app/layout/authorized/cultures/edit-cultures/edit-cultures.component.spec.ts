import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCulturesComponent } from './edit-cultures.component';

describe('EditCulturesComponent', () => {
  let component: EditCulturesComponent;
  let fixture: ComponentFixture<EditCulturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditCulturesComponent],
    });
    fixture = TestBed.createComponent(EditCulturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
