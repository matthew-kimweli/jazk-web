import { TestBed } from '@angular/core/testing';

import { AiAskService } from './ai-ask.service';

describe('AiAskService', () => {
  let service: AiAskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiAskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
