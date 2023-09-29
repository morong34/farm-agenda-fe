import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturesContainerComponent } from './cultures-container.component';

describe('CulturesContainerComponent', () => {
  let component: CulturesContainerComponent;
  let fixture: ComponentFixture<CulturesContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CulturesContainerComponent]
    });
    fixture = TestBed.createComponent(CulturesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
