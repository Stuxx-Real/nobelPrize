import { TestBed } from '@angular/core/testing';

import { Nobel } from './nobel';

describe('Nobel', () => {
  let service: Nobel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nobel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
