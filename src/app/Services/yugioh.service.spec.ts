import { TestBed } from '@angular/core/testing';

import { YugiohService } from './yugioh.service';

describe('YugiohService', () => {
  let service: YugiohService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YugiohService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
