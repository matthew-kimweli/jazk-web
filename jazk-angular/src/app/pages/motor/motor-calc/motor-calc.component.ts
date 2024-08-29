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
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-motor-calc',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    IMaskModule,
    ReactiveFormsModule,
  ],
  templateUrl: './motor-calc.component.html',
  styleUrl: './motor-calc.component.css',
})
export class MotorCalcComponent implements OnInit {
  motorClass: any = '';
  makeModel: any = '';
  numberPlate: any = '';
  filteredMakeModels: any[] = [];
  yearOfManufacture: any = '';
  sumInsured: any;
  courtesyCar: any = '';
  pvt: any = '';
  pvtBenefit: any = 0;
  windscreen: any;
  radioCassette: any;
  excessProtector: any = '';
  excessProtectorBenefit: any;
  aaRoadRescue: any = '';
  aaRoadRescueBenefit: any = 0;
  passengerLegalLiability: any = '';
  displayedBasicPremium: any = 0;
  displayedGrossPremium: any = 0

  control!: FormControl;
  windscreenControl!: FormControl;
  radioControl!: FormControl;

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
  sumInsuredMask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 500000,
  };
  data: any = {};
  manualClientData: any = {};
  filteredBenefits: any[] = [];

  constructor(
    public motorService: MotorService,
    public auth: AuthService,
    private router: Router,
    public parseService: ParseService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.control = new FormControl<number>(this.sumInsured);
    this.windscreenControl = new FormControl<number>(this.windscreen);
    this.radioControl = new FormControl<number>(this.radioCassette);
    this.filterBenefits();
  }

  filterBenefits() {
    if (this.sumInsured > 2500000) {
      this.filteredBenefits = this.motorService.lossOfUseBenefit.filter((item: any) => item.motorSubclass === 'Premier Auto');
    } else {
      this.filteredBenefits = this.motorService.lossOfUseBenefit.filter((item: any) => item.motorSubclass === 'Standard Auto');
    }
  }

  getYears(event: any) {
    let value = event.target.value;
    let tyear = new Date().getFullYear();
    if (value == 'Tankers' || value == 'SubaruProboxEtc') {
      this.tYears = [];
      for (let index = 0; index < 10; index++) {
        this.tYears.push(tyear--);
      }
      return;
    }
    this.tYears = [];
    for (let index = 0; index < 15; index++) {
      this.tYears.push(tyear--);
    }
    return;
  }

  filterMakeModels() {
    if (this.motorClass) {
      this.filteredMakeModels = this.motorService.makeModels.filter(
        (model: any) => model.class === this.motorClass
      );
    } else {
      this.filteredMakeModels = [];
    }
  }

  onVehicleValueChange(event: any) {
    let value = this.sumInsured//event.target.value;
    this.filterBenefits();
    if ((value > 1500000 && this.motorClass == 'private') || this.makeModel == 'MotorCommercialOwnGoods') {
      this.excessProtectorBenefit = 'Inclusive';
    } else if (typeof this.excessProtectorBenefit == 'number') {
      this.excessProtector = '';
      this.excessProtectorBenefit = 'Inclusive';
    } else {
      this.excessProtector = '';
    }
    if (this.motorClass && this.makeModel && this.yearOfManufacture && this.sumInsured) {
      this.calculate()
      console.log('Go ', this.displayedBasicPremium)
    }
  }

  getQuote() {
    this.router.navigate(['motor-quote']);
  }

  calculate() {

    const basicPremium = this.motorService.calculatePremium(
      this.motorClass,
      this.makeModel,
      this.yearOfManufacture,
      this.sumInsured
    );

    console.log('calculated basic', basicPremium)

    this.displayedBasicPremium = basicPremium

    this.pvtBenefit = this.motorService.getPVT(this.pvt, this.sumInsured, this.motorClass);

    if (this.excessProtector.length != 0) {
      this.excessProtectorBenefit = this.motorService.getExcessProtector(
        this.excessProtector,
        this.sumInsured,
        this.motorClass,
        this.makeModel
      );
    }

    if (this.aaRoadRescue.length != 0) {
      this.aaRoadRescueBenefit = this.motorService.getAAR(this.aaRoadRescue);
    }

    this.motorService.motorQuotation.basicPremium = basicPremium;
    this.motorService.motorQuotation.pvtBenefit = this.pvtBenefit;
    this.motorService.motorQuotation.pvtInterest = this.pvt;
    this.motorService.motorQuotation.excessProtectorBenefit = this.excessProtectorBenefit;
    this.motorService.motorQuotation.excessProtectorInterest = this.excessProtector;
    this.motorService.motorQuotation.courtesyCarBenefit = this.courtesyCar.length == 0 ? 0 : Number(this.courtesyCar);
    this.motorService.motorQuotation.courtesyCarInterest = this.courtesyCar.length == 0 ? '' : this.motorService.getTimeForBenefit(Number(this.courtesyCar))
    this.motorService.motorQuotation.aaRoadRescueBenefit = this.aaRoadRescueBenefit;
    this.motorService.motorQuotation.aaRoadRescueInterest = this.aaRoadRescue;
    this.motorService.motorQuotation.windScreenBenefit = this.motorService.getWindOrRadio(this.windscreen, this.sumInsured);
    this.motorService.motorQuotation.windScreenExtraBenefit = this.sumInsured >= 2500000 ? (this.windscreen > 100000 ? (this.windscreen - 100000) : 0) : (this.windscreen > 50000 ? (this.windscreen - 50000) : 0);
    this.motorService.motorQuotation.radioCassetteBenefit = this.motorService.getWindOrRadio(this.radioCassette, this.sumInsured);
    this.motorService.motorQuotation.radioCassetteExtraBenefit = this.sumInsured >= 2500000 ? (this.radioCassette > 100000 ? (this.radioCassette - 100000) : 0) : (this.radioCassette > 50000 ? (this.radioCassette - 50000) : 0);
    this.motorService.motorQuotation.passengerLegalLiabilityBenefit = this.passengerLegalLiability;
    this.motorService.motorQuotation.noOfPassengers = this.motorService.getPassengerNo(Number(this.passengerLegalLiability));
    
    this.motorService.calculatePremiums();
  }

  async submit() {
    this.motorService.motorQuotation.motorClass = this.motorClass;
    this.motorService.motorQuotation.makeModel = this.makeModel;
    this.motorService.motorQuotation.numberPlate = this.numberPlate;
    this.motorService.motorQuotation.yearOfManufacture = this.yearOfManufacture;
    this.motorService.motorQuotation.sumInsured = this.sumInsured;

    if (this.motorClass == 'commercial') {
      if (this.makeModel == 'PSVTours') {
        document.getElementById('manualUnderwritingModalButton')?.click();
        return;
      }
    }

    if (this.motorClass == 'private') {
      if (this.makeModel == 'Rare & Unique Models') {
        document.getElementById('manualUnderwritingModalButton')?.click();
        return;
      }
    }

    const basicPremium = this.motorService.calculatePremium(
      this.motorClass,
      this.makeModel,
      this.yearOfManufacture,
      this.sumInsured
    );

    this.pvtBenefit = this.motorService.getPVT(this.pvt, this.sumInsured, this.motorClass);

    if (this.excessProtector.length != 0) {
      this.excessProtectorBenefit = this.motorService.getExcessProtector(
        this.excessProtector,
        this.sumInsured,
        this.motorClass,
        this.makeModel
      );
    }

    if (this.aaRoadRescue.length != 0) {
      this.aaRoadRescueBenefit = this.motorService.getAAR(this.aaRoadRescue);
    }

    this.motorService.motorQuotation.basicPremium = basicPremium;
    this.motorService.motorQuotation.pvtBenefit = this.pvtBenefit;
    this.motorService.motorQuotation.pvtInterest = this.pvt;
    this.motorService.motorQuotation.excessProtectorBenefit = this.excessProtectorBenefit;
    this.motorService.motorQuotation.excessProtectorInterest = this.excessProtector;
    this.motorService.motorQuotation.courtesyCarBenefit = this.courtesyCar.length == 0 ? 0 : Number(this.courtesyCar);
    this.motorService.motorQuotation.courtesyCarInterest = this.courtesyCar.length == 0 ? '' : this.motorService.getTimeForBenefit(Number(this.courtesyCar))
    this.motorService.motorQuotation.aaRoadRescueBenefit = this.aaRoadRescueBenefit;
    this.motorService.motorQuotation.aaRoadRescueInterest = this.aaRoadRescue;
    this.motorService.motorQuotation.windScreenBenefit = this.motorService.getWindOrRadio(this.windscreen, this.sumInsured);
    this.motorService.motorQuotation.windScreenExtraBenefit = this.sumInsured >= 2500000 ? (this.windscreen > 100000 ? (this.windscreen - 100000) : 0) : (this.windscreen > 50000 ? (this.windscreen - 50000) : 0);
    this.motorService.motorQuotation.radioCassetteBenefit = this.motorService.getWindOrRadio(this.radioCassette, this.sumInsured);
    this.motorService.motorQuotation.radioCassetteExtraBenefit = this.sumInsured >= 2500000 ? (this.radioCassette > 100000 ? (this.radioCassette - 100000) : 0) : (this.radioCassette > 50000 ? (this.radioCassette - 50000) : 0);
    this.motorService.motorQuotation.passengerLegalLiabilityBenefit = this.passengerLegalLiability;
    this.motorService.motorQuotation.noOfPassengers = this.motorService.getPassengerNo(Number(this.passengerLegalLiability));
    
    this.motorService.calculatePremiums();

    console.log('Result: ', this.motorService.motorQuotation);

    let JazkeQuotation = Parse.Object.extend('JazkeQuotation');
    let quote = new JazkeQuotation();

    quote.set('insurance_type', 'motor');

    if (this.motorClass == 'private') {
      quote.set('insurance_type', 'motor-private');
    } else if (this.motorClass == 'commercial') {
      quote.set('insurance_type', 'motor-commercial');
    }

    let user = this.auth.currentUser;
    if (user) {
      quote.set('user_id', user?.id);
    }

    quote.set('whatIsInsured', `${this.motorService.motorQuotation.makeModel} ${this.motorService.motorQuotation.yearOfManufacture}`)
    quote.set('quoteData', {...this.motorService.motorQuotation})

    this.motorService.motorQuotation.quoteDB = quote
    this.getQuote();

    // let res = await this.parseService.saveSilent(
    //   quote,
    //   this.motorService.motorQuotation
    // );
    // if (res) {
    //   this.getQuote();
    // }
  }

  async submitForManualUnderwriting() {
    let JazkeQuotation = Parse.Object.extend('JazkeManualQuotation');
    let quote = new JazkeQuotation();
    quote.set('insurance_type', 'motor');
    quote.set('quotation', this.motorService.motorQuotation);
    quote.set('client', this.manualClientData);
    let res = await this.parseService.saveSilent(quote);
    if (res) {
      this.toastr.success(
        'Submitted',
        'The provided phone number will be contacted shortly'
      );
    }
  }
}
