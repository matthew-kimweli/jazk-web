import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeInstallmentPaymentComponent } from './make-installment-payment.component';

describe('MakeInstallmentPaymentComponent', () => {
  let component: MakeInstallmentPaymentComponent;
  let fixture: ComponentFixture<MakeInstallmentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeInstallmentPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeInstallmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
