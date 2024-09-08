import { TestBed } from '@angular/core/testing';

import { UserCustomService } from './user-custom.service';

describe('UserCustomService', () => {
  let service: UserCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
