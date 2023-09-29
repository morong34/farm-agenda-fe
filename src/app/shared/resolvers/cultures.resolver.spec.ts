import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { culturesResolver } from './cultures.resolver';

describe('culturesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => culturesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
