import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPaymentSuccessComponent } from './motor-payment-success.component';

describe('MotorPaymentSuccessComponent', () => {
  let component: MotorPaymentSuccessComponent;
  let fixture: ComponentFixture<MotorPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorPaymentSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
