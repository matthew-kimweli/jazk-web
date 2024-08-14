import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { FooterComponent } from '../../_components/footer/footer.component';
import { MotorService } from '../../../services/motor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-motor-calc',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './motor-calc.component.html',
  styleUrl: './motor-calc.component.css'
})
export class MotorCalcComponent implements OnInit {
  step = 1;

  motorClass: any = '';
  makeModel: any = '';
  filteredMakeModels: any[] = [];

  constructor(
    public motorService : MotorService,
  ) {}

  ngOnInit() {}

  filterMakeModels() {
    if (this.motorClass) {
      this.filteredMakeModels = this.motorService.makeModels.filter((model: any) => model.class === this.motorClass);
    } else {
      this.filteredMakeModels = [];
    }
  }

  nextStep() {
    if (this.motorClass && this.makeModel) {
      this.step = 2;
    }
  }

  previousStep() {
    this.step = 1;
  }

  submit() {
    if (this.motorClass && this.makeModel) {
      // Handle form submission
      console.log('Form submitted with', { motorClass: this.motorClass, makeModel: this.makeModel });
    }
  }

}
