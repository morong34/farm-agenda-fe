import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cultureResolver } from './culture.resolver';

describe('cultureResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => cultureResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
