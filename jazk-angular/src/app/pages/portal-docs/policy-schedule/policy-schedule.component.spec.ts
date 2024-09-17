import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyScheduleComponent } from './policy-schedule.component';

describe('PolicyScheduleComponent', () => {
  let component: PolicyScheduleComponent;
  let fixture: ComponentFixture<PolicyScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
