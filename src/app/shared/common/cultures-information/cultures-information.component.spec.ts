import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturesInformationComponent } from './cultures-information.component';

describe('CulturesInformationComponent', () => {
  let component: CulturesInformationComponent;
  let fixture: ComponentFixture<CulturesInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturesInformationComponent]
    });
    fixture = TestBed.createComponent(CulturesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
