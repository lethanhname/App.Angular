import { TestBed } from '@angular/core/testing';

import { HighchartWidgetService } from './highchart-widget.service';

describe('HighchartWidgetService', () => {
  let service: HighchartWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
