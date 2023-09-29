import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcelsComponent } from './add-parcels.component';

describe('AddParcelsComponent', () => {
  let component: AddParcelsComponent;
  let fixture: ComponentFixture<AddParcelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParcelsComponent]
    });
    fixture = TestBed.createComponent(AddParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
