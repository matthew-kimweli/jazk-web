import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorKycComponent } from './motor-kyc.component';

describe('MotorKycComponent', () => {
  let component: MotorKycComponent;
  let fixture: ComponentFixture<MotorKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorKycComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
