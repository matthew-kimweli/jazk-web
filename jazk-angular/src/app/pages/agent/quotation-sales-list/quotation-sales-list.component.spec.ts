import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSalesListComponent } from './quotation-sales-list.component';

describe('QuotationSalesListComponent', () => {
  let component: QuotationSalesListComponent;
  let fixture: ComponentFixture<QuotationSalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationSalesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
