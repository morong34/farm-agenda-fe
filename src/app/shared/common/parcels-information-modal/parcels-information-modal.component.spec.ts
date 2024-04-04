import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsInformationModalComponent } from './parcels-information-modal.component';

describe('FieldsInformationModalComponent', () => {
  let component: ParcelsInformationModalComponent;
  let fixture: ComponentFixture<ParcelsInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelsInformationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParcelsInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
