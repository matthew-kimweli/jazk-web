import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { FooterComponent } from '../../_components/footer/footer.component';
import { MotorService } from '../../../services/motor.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import vehicleData from '../../../_helpers/vehicleMake.json';
import { v4 as uuidv4 } from 'uuid';
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
  displayedGrossPremium: any = 0;

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
  benefit50Mask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 50000,
  };
  benefit100Mask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 100000,
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

  vehicleMakes: any = Object.keys(vehicleData);
  vehicleModels: any = vehicleData;

  vehicleMake: any = '';
  modelOfVehicle: any = '';
  vehicleModel: any = '';

  vehicleMakeNotSelected = true;
  selectedVehicle: any;
  selectedVehicleMake: any;
  motorId: any;

  emailQuoteDetails: any = {};
  actionType: any;
  clientForm!: FormGroup;

  disableButton: any = false;
  serialNumber: any;

  constructor(
    public motorService: MotorService,
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public parseService: ParseService,
    private toastr: ToastrService
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      registrationNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.motorService.resetQuotation();

    this.motorService.motorQuotation.motorId = uuidv4();
    this.motorService.motorQuotation.vehicleDisabled = true;
    this.control = new FormControl<number>(this.sumInsured);

    this.windscreenControl = new FormControl<number>(this.windscreen);
    this.radioControl = new FormControl<number>(this.radioCassette);
    this.filterBenefits();
    this.getYears()
  }


  sumInsuredLimits() {

  }

  filterBenefits() {
    if (this.sumInsured > 2500000) {
      this.filteredBenefits = this.motorService.lossOfUseBenefit.filter(
        (item: any) => item.motorSubclass === 'Premier Auto'
      );
    } else {
      this.filteredBenefits = this.motorService.lossOfUseBenefit.filter(
        (item: any) => item.motorSubclass === 'Standard Auto'
      );
    }
  }

  onVehicleModelSelected() {

    if (this.makeModel.length === 0) {
      // Convert the name property to lowercase and check if it contains the vehicle model (also converted to lowercase)
      const result = this.motorService.makeModels.find((model: any) => {
        return (
          model.class.toLowerCase() === this.motorClass.toLowerCase() &&
          (model.name.toLowerCase().includes(this.vehicleModel.toLowerCase()) || model.name.toLowerCase().includes(this.vehicleMake.toLowerCase())) // Check both model and make
        );
      });

      // If result is found, use its label; otherwise, default to 'AllOtherVehicleMakes'
      const label = result ? result.label : this.motorService.makeModels.find((model: any) => model.label === 'AllOtherVehicleMakes').label;
      this.makeModel = label
    }
  }

  onVehicleMakeChanged(event: any, id: any) {
    if (event.target.value) {
      console.log('Yess..')
      this.selectedVehicleMake = id;
      //@ts-ignore
      if (this.motorService.motorQuotation.motorId === id) {
        this.motorService.motorQuotation.vehicleDisabled = false;
      }
      // this.vehicleMakeNotSelected = false;
      // this.motorClass = ''
    
      if (
        this.motorClass &&
        this.vehicleModel &&
        this.yearOfManufacture &&
        this.sumInsured
      ) {
        this.vehicleModel = '';
        // this.motorClass = '';
        this.yearOfManufacture = '';
        this.sumInsured = '';
        this.control.reset();
      }
    }
  }

  getYears() {
    let tyear = new Date().getFullYear();
    // if (value == 'Tankers' || value == 'SubaruProboxEtc') {
    //   this.tYears = [];
    //   for (let index = 0; index < 10; index++) {
    //     this.tYears.push(tyear--);
    //   }
    //   return;
    // }
    this.tYears = [];
    // for (let index = 0; index < 15; index++) {
    //   this.tYears.push(tyear--);
    // }
    for (let index = 0; index < 100; index++) {
      this.tYears.push(tyear--)
    }
    return;
  }

  onSelectManufactureYear() {
    let year = this.yearOfManufacture;
    let currentYear = new Date().getFullYear()
    let minTankersSubaruYear = currentYear - 10
    let minVehicleYear = currentYear - 15
    if (year < minTankersSubaruYear && this.makeModel == 'Tankers') {
      this.yearOfManufacture = '-'
      setTimeout(() => {
        this.yearOfManufacture = ''
      }, 400);
      this.toastr.error('Please note we only insure Tankers whose age is not more than 10 years from the year of manufacture.')
    } else if (year < minTankersSubaruYear && this.makeModel == 'SubaruProboxEtc') {
      this.yearOfManufacture = '-'
      setTimeout(() => {
        this.yearOfManufacture = ''
      }, 400);
      this.toastr.error('Please note we only insure a ' + this.vehicleMake + ' ' + this.vehicleModel + ' whose age is not more than 10 years from the year of manufacture.')
    } else if (year < minVehicleYear) {
      this.yearOfManufacture = '-'
      setTimeout(() => {
        this.yearOfManufacture = ''
      }, 400);
      this.toastr.error('Please note we only insure vehicles whose age is not more than 15 years from the year of manufacture.')
    }
  }

  filterMakeModels() {
    if (this.motorClass) {
      this.filteredMakeModels = this.motorService.makeModels.filter(
        (model: any) => model.class === this.motorClass
      );
    } else {
      this.filteredMakeModels = [];
    }
    if (
      this.vehicleMake &&
      this.vehicleModel &&
      this.yearOfManufacture &&
      this.sumInsured
    ) {
      this.vehicleModel = '';
      this.vehicleMake = '';
      this.yearOfManufacture = '';
      this.sumInsured = '';
      this.control.reset();
    }
  }

  onVehicleValueChange(event: any) {
    let value = this.sumInsured; //event.target.value;
    if (value < 500000) {
      this.toastr.error('The value of the vehicle should not be less than Kshs.500,000')
    } else if (value > 15000000 && this.motorClass == 'private') {
      this.disableButton = true
    } else if (value > 20000000 && this.motorClass == 'commercial') {
      this.disableButton = true
    }

    this.filterBenefits();
    if (
      (value > 1500000 && this.motorClass == 'private') ||
      this.makeModel == 'MotorCommercialOwnGoods'
    ) {
      this.excessProtectorBenefit = 'Inclusive';
    } else if (typeof this.excessProtectorBenefit == 'number') {
      this.excessProtector = '';
      this.excessProtectorBenefit = 'Inclusive';
    } else {
      this.excessProtector = '';
      this.excessProtectorBenefit = 0;
    }

    const inputElement = event.target as HTMLInputElement; // Type assertion to access value properly
    let inputValueString = inputElement.value; // Original string value

    // Remove commas from the string
    inputValueString = inputValueString.replace(/,/g, '');

    const inputValue = parseFloat(inputValueString); // Get the input's value

    if (inputValue <= 2500000) {
      this.windscreen = 50000
      this.radioCassette = 50000
    } else {
      this.windscreen = 100000
      this.radioCassette = 100000
    }

    if (inputValue <= 2500000 && this.windscreen === 100000) {
      this.windscreen = 50000
    } else if (inputValue > 2500000 && this.windscreen === 50000) {
      this.windscreen = 100000
    } else if (inputValue <= 2500000 && this.radioCassette === 100000) {
      this.radioCassette = 50000
    } else if (inputValue > 2500000 && this.radioCassette === 50000) {
      this.radioCassette = 100000
    }

    if (
      this.motorClass &&
      this.makeModel &&
      this.yearOfManufacture &&
      this.sumInsured
    ) {
      this.calculate();
    }
  }

  calculate() {


    this.motorService.motorQuotation.motorClass = this.motorClass;
    this.motorService.motorQuotation.makeModel = this.makeModel;
    this.motorService.motorQuotation.vehicleMake = this.vehicleMake;
    this.motorService.motorQuotation.vehicleModel = this.vehicleModel;
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

    this.pvtBenefit = this.motorService.getPVT(
      this.pvt,
      this.sumInsured,
      this.motorClass
    );

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
    this.motorService.motorQuotation.excessProtectorBenefit =
      this.excessProtectorBenefit;
    this.motorService.motorQuotation.excessProtectorInterest =
      this.excessProtector;
    this.motorService.motorQuotation.courtesyCarBenefit =
      this.courtesyCar.length == 0 ? 0 : Number(this.courtesyCar);
    this.motorService.motorQuotation.courtesyCarInterest =
      this.courtesyCar.length == 0
        ? ''
        : this.motorService.getTimeForBenefit(Number(this.courtesyCar));
    this.motorService.motorQuotation.aaRoadRescueBenefit =
      this.aaRoadRescueBenefit;
    this.motorService.motorQuotation.aaRoadRescueInterest = this.aaRoadRescue;
    this.motorService.motorQuotation.windScreenBenefit =
      this.motorService.getWindOrRadio(this.windscreen, this.sumInsured);
    this.motorService.motorQuotation.windScreenExtraBenefit =
      this.sumInsured >= 2500000
        ? this.windscreen > 100000
          ? this.windscreen - 100000
          : 0
        : this.windscreen > 50000
          ? this.windscreen - 50000
          : 0;
    this.motorService.motorQuotation.radioCassetteBenefit =
      this.motorService.getWindOrRadio(this.radioCassette, this.sumInsured);
    this.motorService.motorQuotation.radioCassetteExtraBenefit =
      this.sumInsured >= 2500000
        ? this.radioCassette > 100000
          ? this.radioCassette - 100000
          : 0
        : this.radioCassette > 50000
          ? this.radioCassette - 50000
          : 0;
    this.motorService.motorQuotation.passengerLegalLiabilityBenefit = Number(
      this.passengerLegalLiability
    );
    this.motorService.motorQuotation.noOfPassengers =
      this.motorService.getPassengerNo(Number(this.passengerLegalLiability));

    this.motorService.calculatePremiums();
  }

  async submit() {
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

    quote.set(
      'whatIsInsured',
      `${this.motorService.motorQuotation.makeModel} ${this.motorService.motorQuotation.yearOfManufacture}`
    );
    quote.set('quoteData', { ...this.motorService.motorQuotation });

    this.motorService.motorQuotation.quoteDB = quote;
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

  async purchase() {
    if (this.motorClass == 'commercial') {
      if (this.makeModel == 'Tankers' || this.makeModel == 'DrivingSchool' || this.makeModel == 'MotorCommercialInstitutional' || this.makeModel == 'SpecialVehiclesAgricultural' || this.makeModel == 'SpecialVehiclesAmbulance' || this.makeModel == 'SpecialVehiclesFireFighters' || this.sumInsured > 20000000) {
        document.getElementById('manualUnderwritingModalButton')?.click();
        return;
      }
    } else if (this.sumInsured > 15000000 && this.motorClass == 'private') {
      document.getElementById('manualUnderwritingModalButton')?.click();
      return;
    }
    this.submit();
    this.toastr.success('Please wait', 'Submitting...');
    let quoteDB: any = this.motorService.motorQuotation.quoteDB;
    let q = await this.parseService.saveSilent(quoteDB);
    if (q) {
      this.router.navigate(['/motor-kyc', q.id]);
    }
  }

  async onSubmitEmailDownload() {
    if (this.motorClass == 'commercial') {
      if (this.makeModel == 'Tankers' || this.makeModel == 'DrivingSchool' || this.makeModel == 'MotorCommercialInstitutional' || this.makeModel == 'SpecialVehiclesAgricultural' || this.makeModel == 'SpecialVehiclesAmbulance' || this.makeModel == 'SpecialVehiclesFireFighters' || this.sumInsured > 20000000) {
        document.getElementById('manualUnderwritingModalButton')?.click();
        return;
      }
    } else if (this.sumInsured > 15000000 && this.motorClass == 'private') {
      document.getElementById('manualUnderwritingModalButton')?.click();
      return;
    }
    this.submit();
    console.log(this.clientForm.value);

    if (this.clientForm.valid) {
      let quoteDB: any = this.motorService.motorQuotation.quoteDB;
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
        this.router.navigate(['/motor-view-quote', saved.id]);
      } else {
        this.toastr.error('Unable to Submit', 'Please try again');
      }
    }
  }
  downloadQuote() {
    if (this.motorClass == 'commercial') {
      if (this.makeModel == 'Tankers' || this.makeModel == 'DrivingSchool' || this.makeModel == 'MotorCommercialInstitutional' || this.makeModel == 'SpecialVehiclesAgricultural' || this.makeModel == 'SpecialVehiclesAmbulance' || this.makeModel == 'SpecialVehiclesFireFighters' || this.sumInsured > 20000000) {
        document.getElementById('manualUnderwritingModalButton')?.click();
        return;
      }
    } else if (this.sumInsured > 15000000 && this.motorClass == 'private') {
      document.getElementById('manualUnderwritingModalButton')?.click();
      return;
    }
    this.submit();
    this.router.navigate(['motor-view-quote']);
  }
  emailQuote() { }

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
