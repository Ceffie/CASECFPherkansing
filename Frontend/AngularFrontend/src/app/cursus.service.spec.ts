import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CursusService } from './cursus.service';

describe('CursusService', () => {
  let service: CursusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CursusService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(CursusService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
