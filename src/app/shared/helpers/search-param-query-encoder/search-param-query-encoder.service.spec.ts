/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchParamQueryEncoderService } from './search-param-query-encoder.service';

describe('Service: SearchParamQueryEncoder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchParamQueryEncoderService]
    });
  });

  it('should ...', inject([SearchParamQueryEncoderService], (service: SearchParamQueryEncoderService) => {
    expect(service).toBeTruthy();
  }));
});
