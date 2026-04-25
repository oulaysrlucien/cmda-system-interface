import { TestBed } from '@angular/core/testing';

import { CmdaMemberService } from './cmda-member.service';

describe('CmdaMemberService', () => {
  let service: CmdaMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmdaMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
