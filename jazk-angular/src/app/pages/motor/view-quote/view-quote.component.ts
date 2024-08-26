import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../_components/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import * as Parse from 'parse';

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
export class ViewQuoteComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      registrationNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];

      if (id) {
        this.fetchQuotation(id);
      }
    });
  }

  async fetchQuotation(id: any) {
    try {
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeQuotation');
      let quote = await query.get(id);
      console.log('quote', quote);
      if(quote){
        this.motorService.motorQuotation = quote.get('quoteData')
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

  purchase() {
    this.router.navigate(['motor-kyc']);
  }

  async onSubmitEmailDownload() {
    console.log(this.clientForm.value);

    if (this.clientForm.valid) {
      let quoteDB = this.motorService.motorQuotation.quoteDB;
      quoteDB.set('actionType', this.actionType);
      quoteDB.set('client', this.clientForm.value);
      this.toastr.success('Please wait', 'Submitting...');
      let saved = await this.parseService.saveSilent(quoteDB);
      if (saved) {
        if (this.actionType == 'Email') {
          this.toastr.success(
            'Submitted',
            `Quotation has been sent to the client's email`
          );
        } else {
          this.toastr.success('Downloaded');
        }
        this.router.navigate(['/motor-view-quote', saved.id])
      } else {
        this.toastr.error('Unable to Submit', 'Please try again');
      }
    }
  }
  downloadQuote() {
    this.router.navigate(['motor-view-quote']);
  }
  emailQuote() {}

  goBack() {
    history.back();
  }

  get clientName() {
    return this.clientForm!.get('name')!;
  }
  get clientPhone() {
    return this.clientForm!.get('phone')!;
  }
  get clientEmail() {
    return this.clientForm!.get('email')!;
  }
  get registrationNumber() {
    return this.clientForm!.get('registrationNumber')!;
  }

  
}
