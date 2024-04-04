import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { polygonsResolver } from './polygons.resolver';

describe('polygonsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      polygonsResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
