import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleDetailsComponent } from './view-sale-details.component';

describe('ViewSaleDetailsComponent', () => {
  let component: ViewSaleDetailsComponent;
  let fixture: ComponentFixture<ViewSaleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSaleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSaleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
