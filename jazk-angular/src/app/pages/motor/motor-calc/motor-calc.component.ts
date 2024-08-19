import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { FooterComponent } from '../../_components/footer/footer.component';
import { MotorService } from '../../../services/motor.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-motor-calc',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, IMaskModule, ReactiveFormsModule],
  templateUrl: './motor-calc.component.html',
  styleUrl: './motor-calc.component.css'
})
export class MotorCalcComponent implements OnInit {
  motorClass: any = '';
  makeModel: any = '';
  filteredMakeModels: any[] = [];
  yearOfManufacture: any = '';
  sumInsured: any;
  courtesyCarOptions = [{amount: 'yes', name: '30 Days'},{amount: 'no', name: '20 Days'}, {amount: 'no', name: '10 Days'}, {amount: 0, name: 'No'}];
  courtesyCar: any = '';
  pvt: any = '';
  windscreen: any;
  radioCassette: any;
  excessProtector: any = '';
  aaRoadRescue: any = '';

  control!: FormControl

  tYears: any = [];

  mask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 0,
  };
  data: any = {};


  constructor(
    public motorService : MotorService,
    public auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.control = new FormControl<number>(this.sumInsured);
    this.getYears();
  }

  getYears() {
    let tyear = new Date().getFullYear()
    for (let index = 0; index < 100; index++) {
      this.tYears.push(tyear--)
    }
  }

  filterMakeModels() {
    if (this.motorClass) {
      this.filteredMakeModels = this.motorService.makeModels.filter((model: any) => model.class === this.motorClass);
    } else {
      this.filteredMakeModels = [];
    }
  }

  submit() {
    if (this.motorClass && this.makeModel) {
      // Handle form submission
      console.log('Form submitted with', { motorClass: this.motorClass, makeModel: this.makeModel });
    }
  }


  getQuote(){
    this.router.navigate(['motor-quote'])
  }

}
