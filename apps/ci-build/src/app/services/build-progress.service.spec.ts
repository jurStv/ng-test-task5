import { TestBed } from '@angular/core/testing';

import { BuildProgressService } from './build-progress.service';

describe('BuildProgressService', () => {
  let service: BuildProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
