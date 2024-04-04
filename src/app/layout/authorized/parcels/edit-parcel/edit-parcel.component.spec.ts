import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParcelComponent } from './edit-parcel.component';

describe('EditParcelComponent', () => {
  let component: EditParcelComponent;
  let fixture: ComponentFixture<EditParcelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditParcelComponent],
    });
    fixture = TestBed.createComponent(EditParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
