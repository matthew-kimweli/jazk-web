import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuoteSubdetailsComponent } from './view-quote-subdetails.component';

describe('ViewQuoteSubdetailsComponent', () => {
  let component: ViewQuoteSubdetailsComponent;
  let fixture: ComponentFixture<ViewQuoteSubdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuoteSubdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQuoteSubdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
