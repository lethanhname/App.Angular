import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGroupUpdateComponent } from './stock-group-update.component';

describe('StockGroupUpdateComponent', () => {
  let component: StockGroupUpdateComponent;
  let fixture: ComponentFixture<StockGroupUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockGroupUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockGroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
