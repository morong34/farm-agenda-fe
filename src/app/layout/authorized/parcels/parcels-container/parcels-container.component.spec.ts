import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsContainerComponent } from './parcels-container.component';

describe('ParcelsContainerComponent', () => {
  let component: ParcelsContainerComponent;
  let fixture: ComponentFixture<ParcelsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParcelsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
