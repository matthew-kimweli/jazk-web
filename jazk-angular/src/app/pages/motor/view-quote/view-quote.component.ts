import { Component } from '@angular/core';
import { HeaderComponent } from '../../_components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MotorService } from '../../../services/motor.service';
import { ParseService } from '../../../services/parse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-quote',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  templateUrl: './view-quote.component.html',
  styleUrl: './view-quote.component.css',
})
export class ViewQuoteComponent {
  insurance = {
    coverageType: 'Comprehensive',
    premium: 45000,
    totalCost: 45000,
    limits: {
      thirdPartyPropertyDamage: 500000,
      bodilyInjuryPerPerson: 1000000,
      bodilyInjuryPerAccident: 3000000,
    },
    excesses: {
      ownDamage: 2.5,
      theft: 5.0,
      windscreenDamage: 10.0,
    },
    benefits: {
      medicalExpenses: 100000,
    },
    enhancements: {
      windscreenCover: 20000,
      lossOfUse: 2000,
    },
  };
  emailQuoteDetails: any = {};
  actionType: any;
  clientForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public parseService: ParseService,
    public motorService: MotorService,
    public toastr: ToastrService,
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  purchase() {
    this.router.navigate(['motor-kyc']);
  }


  async onSubmitEmailDownload(){
    console.log(this.clientForm.value)

    if(this.clientForm.valid){
      let quoteDB = this.motorService.motorQuotation.quoteDB;
      quoteDB.set('actionType', this.actionType)
      this.toastr.success('Please wait', 'Submitting...')
      let saved = await this.parseService.saveSilent(quoteDB)
      if(saved){
        if(this.actionType == 'Email'){
          this.toastr.success('Submitted', `Quotation has been sent to the client's email`)
        } else {
          this.toastr.success('Downloaded')
        }
        
      }
    }
  }

  goBack() {
    history.back();
  }


  get clientName() {
    return this.clientForm!.get('name')!
  }
  get clientPhone() {
    return this.clientForm!.get('phone')!
  }
  get clientEmail() {
    return this.clientForm!.get('email')!
  }
  
}
