import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { parcelsResolver } from './parcels.resolver';

describe('parcelsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => parcelsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
