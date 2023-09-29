import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { parcelResolver } from './parcel.resolver';

describe('parcelResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => parcelResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
