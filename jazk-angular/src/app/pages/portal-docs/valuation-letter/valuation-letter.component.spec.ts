import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationLetterComponent } from './valuation-letter.component';

describe('ValuationLetterComponent', () => {
  let component: ValuationLetterComponent;
  let fixture: ComponentFixture<ValuationLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuationLetterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValuationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
