import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UtilsService } from '../../../services/utils.service';
import { ToastrService } from 'ngx-toastr';
import vehicleData from '../../../_helpers/vehicleMake.json';
import bodyTypeData from '../../../_helpers/bodyType.json';
import citiesData from '../../../_helpers/cities.json';
import { HeaderComponent } from '../../_components/header/header.component';
import * as Parse from 'parse';
import { ParseService } from '../../../services/parse.service';
import { MotorService } from '../../../services/motor.service';
import { DataService } from '../../../services/data.service';

declare var FlutterwaveCheckout: any;

@Component({
  selector: 'app-motor-kyc',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
  templateUrl: './motor-kyc.component.html',
  styleUrl: './motor-kyc.component.css',
})
export class MotorKycComponent {
  // acceptTerms: any;
  // userDeclarationYes: any;
  // logBookDeclarationYes: any;
  // vehiclePhotosDeclarationYes: any;
  // privacyNoticeDeclarationYes: any;
  // ownershipDeclarationYes: any;
  // inspectionVehicleDeclarationYes: any;

  user: Parse.Object<Parse.Attributes> | undefined;

  vehicleMakes: any = Object.keys(vehicleData);
  vehicleModels: any = vehicleData;
  bodyTypes: any = bodyTypeData.VEHICLE_BODY_TYPES;
  cities = citiesData.Kenya.Cities;
  tYears: any = [];

  today: any;
  minDate: any;

  vehicles: any;
  twoType = [
    { id: 'yes', name: 'Yes' },
    { id: 'no', name: 'No' },
  ];
  banks_mfis: any = [
    {
      name: 'Absa Bank of Kenya Limited',
      email: 'absa.kenya@absa.africa.com',
    },
    {
      name: 'Access Bank (Kenya) PLC',
      email: 'infokenya@accessbankplc.com',
    },
    {
      name: 'African Banking Corporation Limited',
      email: 'talk2us@abcthebank.com, headoffice@abcthebank.com',
    },
    {
      name: 'Bank of Africa Kenya Limited',
      email: 'headoffice@boakenya.com',
    },
    {
      name: 'Bank of Baroda (K) Limited',
      email: 'ho.kenya@bankofbaroda.com, Kenya@bankofbaroda.com',
    },
    {
      name: 'Bank of India',
      email: 'cekenya@boikenya.com',
    },
    {
      name: 'Citibank N.A Kenya',
      email: 'Kenya.citiservice@citi.com',
    },
    {
      name: 'Consolidated Bank of Kenya Limited',
      email: 'headoffice@consolidated-bank.com',
    },
    {
      name: 'Co-operative Bank of Kenya Limited',
      email: 'customerservice@co-opbank.co.ke',
    },
    {
      name: 'Credit Bank Limited',
      email: 'customerservice@creditbank.co.ke',
    },
    {
      name: 'Development Bank of Kenya Limited',
      email: 'dbk@devbank.com',
    },
    {
      name: 'Diamond Trust Bank Kenya Limited',
      email: 'info@dtbafrica.com',
    },
    {
      name: 'DIB Bank Kenya Limited',
      email: 'contactus@dibkenya.co.ke',
    },
    {
      name: 'Ecobank Kenya Limited',
      email: 'info@ecobank.com',
    },
    {
      name: 'Equity Bank Kenya Limited',
      email: 'info@equitybank.co.ke',
    },
    {
      name: 'Family Bank Limited',
      email: 'customerservice@familybank.co.ke, info@familybank.co.ke',
    },
    {
      name: 'First Community Bank Limited',
      email: 'info@fcb.co.ke',
    },
    {
      name: 'Guaranty Trust Bank (K) Ltd',
      email: 'banking@gtbank.com',
    },
    {
      name: 'Guardian Bank Limited',
      email: 'biashara@guardian-bank.com, headoffice@guardian-bank.com',
    },
    {
      name: 'Gulf African Bank Limited',
      email: 'info@gulfafricanbank.com',
    },
    {
      name: 'Habib Bank A.G Zurich',
      email: 'habibbank@wananchi.com',
    },
    {
      name: 'Habib Bank Limited',
      email: 'habibbank@wananchi.com',
    },
    {
      name: 'I & M Bank Limited',
      email: 'invest@imbank.co.ke',
    },
    {
      name: 'Jamii Bora Bank Limited',
      email: 'info@jamiiborabank.co.ke',
    },
    {
      name: 'KCB Bank Kenya Limited',
      email: 'kcbhq@kcb.co.ke',
    },
    {
      name: 'Kingdom Bank Limited',
      email: 'info@kingdombankltd.co.ke',
    },
    {
      name: 'Mayfair CIB Bank Limited',
      email: 'info@mayfair-bank.com',
    },
    {
      name: 'Middle East Bank (K) Limited',
      email: 'Kingdom Bank Limited',
    },
    {
      name: 'M-Oriental Bank Limited',
      email: 'headoffice@moriental.co.ke',
    },
    {
      name: 'National Bank of Kenya Limited',
      email: 'info@nationalbank.co.ke',
    },
    {
      name: 'NCBA Bank Kenya PLC',
      email: 'contactcentre@ncbagroup.com',
    },
    {
      name: 'Paramount Bank Limited',
      email: 'info@paramountbank.co.ke',
    },
    {
      name: 'Prime Bank Limited',
      email: 'headoffice@primebank.co.ke',
    },
    {
      name: 'SBM Bank Kenya Limited',
      email: 'customerservice@smbank.co.ke',
    },
    {
      name: 'Sidian Bank Limited',
      email: 'enquiries@sidianbank.co.ke',
    },
    {
      name: 'Spire Bank Ltd',
      email: 'letstalk@spirebank.co.ke',
    },
    {
      name: 'Stanbic Bank Kenya Limited',
      email: 'customercare@stanbic.com',
    },
    {
      name: 'Standard Chartered Bank Kenya Limited',
      email: 'Talk-Us@sc.com',
    },
    {
      name: 'Trans-National Bank Limited',
      email: 'customerservice@tnbl.co.ke',
    },
    {
      name: 'UBA Kenya Bank Limited',
      email: 'ubakenya@ubagroup.com',
    },
    {
      name: 'Victoria Commercial Bank Limited',
      email: 'victoria@vicbank.com',
    },

    // microfinances
    {
      name: 'Branch Microfinance Bank Limited',
      email: '',
    },
    {
      name: 'Caritas Microfinance Bank Limited',
      email: 'info@caritas-mfb.co.ke',
    },
    {
      name: 'Century Microfinance Bank Limited',
      email: 'info@century.co.ke',
    },
    {
      name: 'Choice Microfinance Bank Limited',
      email: 'daraja@darajabank.co.ke',
    },
    {
      name: 'Daraja Microfinance Bank Limited',
      email: 'daraja@darajabank.co.ke',
    },
    {
      name: 'Faulu Microfinance Bank Limited',
      email:
        'info@faulukenya.com, customercare@faulukenya.com, contact@faulukenya.com',
    },
    {
      name: 'Kenya Women Microfinance Bank PLC',
      email: 'info@kwftbank.com',
    },
    {
      name: 'LOLC Kenya Microfinance Bank PLC',
      email: '',
    },
    {
      name: 'Maisha Microfinance Bank Ltd',
      email: 'info@maishabank.com',
    },
    {
      name: 'Muungano Microfinance Bank PLC',
      email: 'info@muunganomfbank.co.ke',
    },
    {
      name: 'Rafiki Microfinance Bank Limited',
      email: 'info@rafiki.co.ke',
    },
    {
      name: 'Salaam Microfinance Bank Limited',
      email: '',
    },
    {
      name: 'SMEP Microfinance Bank PLC',
      email: 'info@smep.co.ke',
    },
    {
      name: 'Sumac Microfinance Bank Limited',
      email: 'info@sumacmicrofinancebank.co.ke',
    },
    {
      name: 'U & I Microfinance Bank Limited',
      email: 'info@uni-microfinance.co.ke',
    },
    {
      name: 'Uwezo Microfinance Bank Limited',
      email: 'info@uwezomfbank.com',
    },
  ];

  vehicleMake: any = '';
  engineNumber: any = '';
  yearOfManufacture: any = '';
  bodyType: any = '';
  chasisNumber: any = '';
  modelOfVehicle: any = '';
  registrationNumber: any = '';
  anyBankOrMFIInterested: any = '';
  bankOrMFI: any = '';
  bankOrMFIInterested = false;

  companyDivision: any = '';

  vehicleMakeNotSelected = true;
  selectedVehicle: any;
  selectedVehicleMake: any;
  minDob: any;

  coverStartDate: any;
  coverEndDate: any;
  maxCoverDate: any;
  vehicle: any = {
    kycType: 'individual',
  };

  termsUrl: any =
    'https://www.beanafrica.com/Allianz/ug/PolicyDocs/Private%20Motor%20Insurance%20Policy.pdf';
  quote: any;
  paymentData: any = { method: '', installment_type: '1' };
  installments: any = [];
  motorData: any = {};
  // valuers: any = [
  //   'REGENT VALUERS',
  //   'AUTOMOBILE ASSOCIATION of KENYA',
  //   'SOLVIT LIMITED',
  //   'CAPITAL ALLIANCE VALUERS AND ASSESSORS',
  //   'LINKS VALUERS AND ASSESSORS',
  // ];
  valuers: any = ['REGENT VALUERS', 'SOLVIT LIMITED'];
  searching: any = {};
  coverDates: any;
  disclaimers = [
    {
      declarationYes: false,
      text: 'I have read and accept the <a href="/assets/data/Insurance_Agent_contract_JAZ.pdf" target="_blank">intermediary terms and conditions</a>.',
    },
    {
      declarationYes: false,
      text: 'I have explained and advised the client in detail that they must take the car for valuation as specified in the valuation letter within the next 30 days or their insurance cover will automatically be downgraded to a Third Party Only (TPO) Cover.',
    },
    {
      declarationYes: false,
      text: 'I have explained and advised the client in detail to return the signed proposal form within the next 30 days or their insurance cover will automatically be downgraded to a Third Party Only (TPO) Cover.',
    },
    {
      declarationYes: false,
      text: 'I declare that the information I have entered is as provided by the customer',
    },
  ];
  maxDateOfBirth: string = '';

  constructor(
    public utilsService: UtilsService,
    public authService: AuthService,
    public parseService: ParseService,
    public dataService: DataService,
    public motorService: MotorService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getToday();
  }

  // Validator function for template-driven forms
  validateKraPin(value: string, type: string): boolean {
    if (type == 'individual') {
      const kraPinRegex = /^[A]\d{9}[A-Z]$/i;
      return kraPinRegex.test(value);
    } else {
      const kraPinRegex = /^[P]\d{9}[A-Z]$/i;
      return kraPinRegex.test(value);
    }
  }

  getToday() {
    var date = new Date(); // create a new date object
    var formattedDate = date.toISOString().substring(0, 10); // format the date as yyyy-mm-dd and remove the time and timezone
    console.log(formattedDate); // output the formatted date
    this.today = formattedDate;
    this.minDate = formattedDate;
    const today = new Date();
    const minDateOfBirth = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    this.maxDateOfBirth = minDateOfBirth.toISOString().split('T')[0]; // Format to YYYY-MM-DD

    var minDobDate = new Date();
    minDobDate.setFullYear(date.getFullYear() - 16);

    this.minDob = minDobDate.toISOString().substring(0, 10);

    var maxCoverDate = new Date();
    maxCoverDate.setMonth(date.getMonth() + 6);

    this.maxCoverDate = maxCoverDate.toISOString().substring(0, 10);
  }

  async onSearchNIN(event: any) {
    return;
    let d = {
      nationalID: '12345678',
      firstName: 'John',
      middleName: 'Mwai',
      lastName: 'Doe',
      dateOfBirth: '1990-05-10',
      gender: 'Male',
      citizenship: 'Kenyan',
      placeOfBirth: {
        county: 'Nairobi',
        subCounty: 'Westlands',
        ward: 'Parklands',
      },
      idIssueDate: '2008-11-25',
      maritalStatus: 'Single',
      photo: 'https://iprs.go.ke/photos/12345678.jpg',
      fingerprintData: 'base64encodedfingerprintdata',
      contacts: { phone: '+254712345678', email: 'john.doe@example.com' },
      address: {
        postalAddress: 'P.O Box 12345-00100',
        county: 'Nairobi',
        subCounty: 'Westlands',
        ward: 'Parklands',
      },
      nextOfKin: {
        name: 'Jane Doe',
        relationship: 'Sister',
        phone: '+254711223344',
      },
    };
    try {
      this.searching.nin = true;
      let value: string = event.target.value;
      if (value.length == 8) {
        if (isNaN(Number(value))) {
          this.toastr.error(
            'Please provide a valid NIN. ID should be numbers only'
          );
        } else {
          let query = new Parse.Query('IPRSCache');
          query.equalTo('id_number', value);
          let id = await query.first();
          if (id) {
            d = id?.get('id_data');
            console.log('id', d);

            this.vehicle.pfname = `${d.firstName} ${d.lastName}`;
            // this.vehicle.pfname = d.lastName
            this.vehicle.pfnameMasked = this.utilsService.maskString(
              this.vehicle.pfname
            );
            // this.vehicle.pAddress = d.address.postalAddress
            // this.vehicle.pCity = d.address.county
            // this.vehicle.pemail = d.contacts.email
            // this.vehicle.pphone = d.contacts.phone
            // this.vehicle.dob = d.dateOfBirth
            this.vehicle.gender = d.gender;

            // if (this.vehicle.kycType == 'company') {
            //   this.vehicle.companyRegNo = id
            // } else {
            //   this.vehicle.nin = id
            // }
            // this.vehicle.pphone = String(d.contacts.phone).replace('+254', '')
          }
        }
      }

      this.searching.nin = false;
    } catch (error) {
      console.log(error);
    }
  }

  onClientNameChanged(event: any) {
    let value: string = event.target.value;
    this.vehicle.pfname = value;
    // if(value.includes('*')){
    //   this.vehicle.pname = this.vehicle.pfname
    // }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];

      if (id) {
        this.fetchQuotation(id);
      }
    });

    // console.log(this.utilsService.motorData);
    // let data = this.utilsService.motorData;
    // if (!data) {
    //   this.router.navigate(['motor']);
    // }

    let user = this.authService.currentUser;
    this.user = user;
    if (user) {
      let kyc = user.get('kyc');
      if (kyc) {
        this.vehicle.pfname = kyc.fname;
        this.vehicle.plname = kyc.lname;
        this.vehicle.pAge = kyc.age;
        this.vehicle.pDob = kyc.dob;
        this.vehicle.pphone = kyc.phone;
        this.vehicle.pemail = kyc.email;
        this.vehicle.pTin = kyc.tin;
        this.vehicle.pCity = kyc.city;
        this.vehicle.pAddress = kyc.address;
        this.vehicle.gender = kyc.gender;
        this.vehicle.kycType = kyc.kycType;
        if (this.vehicle.kycType == 'company') {
          this.vehicle.companyRegNo = kyc.companyRegNo;
        } else {
          this.vehicle.nin = kyc.nin;
        }
      }
    }

    // for (let obj of this.utilsService.motorData.autoMobiles) {
    //   obj.vehicleDisabled = true;
    //   obj.IsBankOrMFIinterested = false;
    // }

    // this.vehicles = this.utilsService.motorData.autoMobiles;
    this.getYears();
  }

  async fetchQuotation(id: any) {
    try {
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeQuotation');
      let quote = await query.get(id);
      console.log('quote', quote);
      this.quote = quote;
      if (quote) {
        this.motorService.motorQuotation = quote.get('quoteData');
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

  emailIsValid(): boolean {
    // Perform additional custom validation if needed
    // You might want to add more complex validation logic here
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      this.vehicle.pemail
    );
    // return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.pemail);
  }

  onbankInterestChanged(event: any, id: any) {
    if (event.target.value && event.target.value === 'yes') {
      this.selectedVehicle = id;

      this.vehicle.IsBankOrMFIinterested = true;
      // this.bankOrMFIInterested = true;
    } else {
      //@ts-ignore

      this.vehicle.IsBankOrMFIinterested = false;
    }
  }

  getYears() {
    let tyear = new Date().getFullYear();
    for (let index = 0; index < 100; index++) {
      this.tYears.push(tyear--);
    }
  }

  onCoverDateChanged(event: any) {
    let value = event.target.value;
    if (value) {
      let coverStart = new Date(value);
      this.coverStartDate = coverStart.toISOString().substring(0, 10);

      let d1 = new Date(coverStart.setFullYear(coverStart.getFullYear() + 1));
      let result = new Date(d1.setDate(d1.getDate() - 1));
      this.coverEndDate = result.toISOString().substring(0, 10);

      this.coverDates = {
        startDate: coverStart,
        endDate: result,
      };

      this.checkDoubleInsurance();
    }
  }

  async checkDoubleInsurance() {
    this.searching.doubleInsurance = true;

    let params = {
      endpoint: 'Integration/ValidateDoubleInsurance',
      body: {
        policystartdate: this.utilsService.formatDateSlash(
          this.coverDates.startDate
        ),
        policyenddate: this.utilsService.formatDateSlash(
          this.coverDates.endDate
        ),
        vehicleregistrationnumber:
          this.motorService.motorQuotation.vehicleRegNumber,
        chassisnumber: this.vehicle.chasisNumber,

        // "policystartdate":"26/10/2023",
        // "policyenddate":"26/10/2024",
        // "vehicleregistrationnumber": "KDN979K",
        // "chassisnumber":""
      },
    };

    console.log('checking double insurance...', params);

    try {
      let res = await Parse.Cloud.run('dmvic_request', params);
      console.log('res', res);
      let d = {
        Inputs:
          '{"policystartdate":"26/10/2023","policyenddate":"26/10/2024","vehicleregistrationnumber":"KDN979K","chassisnumber":""}',
        callbackObj: {},
        success: false,
        Error: [
          {
            errorCode: 'ER0016',
            errorText: 'No Records Found',
          },
        ],
        APIRequestNumber: 'UAT-OAR7421',
        DMVICRefNo: null,
      };

      if (!res) {
        this.toastr.error(
          'Unable to check for double insurance',
          'Network Error'
        );
        return;
      }

      if (res.Error && res.Error.length) {
        this.vehicle.hasDoubleInsurance = false;
      } else {
        this.toastr.error(
          'Double Insurance Found',
          'This vehicle is already insured'
        );
        this.vehicle.hasDoubleInsurance = true;
      }
    } catch (error) {
      console.error(error);
    }
    this.searching.doubleInsurance = false;
  }

  createInstallments(event: any) {
    let now = new Date();
    let secondMonth = new Date(new Date().setMonth(now.getMonth() + 1));
    let thirdMonth = new Date(new Date().setMonth(now.getMonth() + 2));
    let data = this.motorService.motorQuotation;
    let amount = data.grossPremium;

    if (this.paymentData.installment_type == '2') {
      let partAmount = amount / 2;
      this.installments = [];
      this.installments.push({ date: now, amount: partAmount });
      this.installments.push({ date: secondMonth, amount: partAmount });
    } else if (this.paymentData.installment_type == '3') {
      let partAmount = amount / 3;
      this.installments = [];
      this.installments.push({ date: now, amount: partAmount });
      this.installments.push({ date: secondMonth, amount: partAmount });
      this.installments.push({ date: thirdMonth, amount: partAmount });
    } else {
      this.installments = [];
    }
  }

  async buyNow() {
    if (!this.motorService.motorQuotation.vehicleRegNumber) {
      this.toastr.error('Vehicle Registration Number is required');
      return;
    }

    this.vehicle.registrationNumber =
      this.motorService.motorQuotation.vehicleRegNumber;
    this.vehicle.vehicleMake = this.motorService.motorQuotation.vehicleMake;
    this.vehicle.vehicleModel = this.motorService.motorQuotation.vehicleModel;

    if (this.vehicle.hasDoubleInsurance) {
      this.toastr.error(
        'Unable to proceed',
        'This vehicle is already insured (Double Insurance Found)'
      );
      return;
    }

    if (!this.vehicle.pfname) {
      this.toastr.error('First name is required');
      return;
    }

    // if (!this.plname) {
    //   this.toastr.error("Last name is required")
    //   return
    // }

    // if (!this.pDob) {
    //   this.toastr.error("Date of Birth is required")
    //   return
    // }

    if (!this.vehicle.pphone) {
      this.toastr.error('Phone number is required');
      return;
    }

    // if (this.pphone.startsWith('07') || this.pphone.startsWith('7')) {
    //   this.pphone = '254' + Number(this.pphone).toString();
    //   // this.toastr.error("Invalid phone. Please include your country code")
    //   // return
    // }

    if (!this.vehicle.pemail) {
      this.toastr.error('Email is required');
      return;
    }

    if (!this.emailIsValid()) {
      this.toastr.error('Please enter a valid email address');
      return;
    }

    if (!this.vehicle.pCity) {
      this.toastr.error('City is required');
      return;
    }
    if (!this.vehicle.pAddress) {
      this.toastr.error('Address of residence is required');
      return;
    }

    if (!this.vehicle.pTin) {
      this.toastr.error('KRA PIN is required');
      return;
    }

    if (!this.coverStartDate) {
      this.toastr.error('Cover Policy Start Date is required');
      return;
    }

    const v = this.vehicle;

    if (!v.bodyType) {
      this.toastr.error(`Please provide body type of vehicle`);
      return;
    }

    if (!v.EngineNumber) {
      this.toastr.error(`Please provide engine number of vehicle`);
      return;
    }
    if (!v.registrationNumber) {
      this.toastr.error(`Please provide registration number of vehicle`);
      return;
    }

    if (!v.chasisNumber) {
      this.toastr.error(`Please provide chasis number of vehicle`);
      return;
    }
    if (!v.seatingCapacity) {
      this.toastr.error(`Please provide seating capacity of vehicle`);
      return;
    }
    if (!v.numPassengers) {
      this.toastr.error(`Please provide number of passengers of vehicle`);
      return;
    }

    if (!v.cc) {
      this.toastr.error(`Please provide vehicle cc`);
      return;
    }

    if (!v.tonnage) {
      this.toastr.error(`Please provide vehicle tonnage`);
      return;
    }

    if (!v.anyBankOrMFIInterested) {
      this.toastr.error(`Please tell us if vehicle has Bank interest or not`);
      return;
    }

    if (v.anyBankOrMFIInterested === 'yes') {
      if (!v.bankOrMFI) {
        this.toastr.error(
          `Please inform us the Bank or MFI that has an interest on the vehicle`
        );
        return;
      }
    }

    // if (!this.acceptTerms) {
    //   this.toastr.error('Please accept the Terms and Conditions to proceed');
    //   return;
    // }

    // if (!this.ownershipDeclarationYes) {
    //   this.toastr.error(
    //     'Please accept the Ownership Declaration statement to proceed'
    //   );
    //   return;
    // }

    // if (!this.inspectionVehicleDeclarationYes) {
    //   this.toastr.error(
    //     'Please accept the Inspection of my vehicle declaration statement to proceed'
    //   );
    //   return;
    // }

    // if (!this.userDeclarationYes) {
    //   this.toastr.error(
    //     'Please accept the Self declaration statement to proceed'
    //   );
    //   return;
    // }

    this.vehicle.pphone = Number(this.vehicle.pphone).toString();

    let userData = {
      fname: this.vehicle.pfname,
      lname: this.vehicle.plname,
      name: this.vehicle.pname || this.vehicle.pfname,
      age: this.vehicle.pAge,
      DoB: this.vehicle.pDob,
      phone: this.vehicle.pphone,
      email: this.vehicle.pemail,
      tin: this.vehicle.pTin,
      city: this.vehicle.pCity,
      address: this.vehicle.pAddress,
    };

    this.motorData.kyc = userData;
    this.motorData.vehicle = this.vehicle;

    this.motorData.companyDivision = this.companyDivision;

    this.motorData.coverStartDate = this.coverStartDate;
    this.motorData.coverEndDate = this.coverEndDate;

    let data = this.motorData;

    console.log('data', this.motorData);

    let access_token = '';
    if (this.authService.currentUser) {
      access_token = this.authService.currentUser.get('premia_access_token');
    }

    if (!access_token) {
      this.toastr.error('Unable to get access token from premia');
      return;
    }

    this.parseService.fetching = true;

    let vehicleStatus = await Parse.Cloud.run('checkVehicleStatus', {
      vehicle_reg_no: v.registrationNumber,
      vehicle_chassis_no: v.chasisNumber,
      vehicle_engine_no: v.EngineNumber,
      access_token: access_token,
    });
    if (vehicleStatus && vehicleStatus.Info == 'Error') {
      this.toastr.error(
        'Vehicle is already insured in Premia',
        'Unable to proceed'
      );
      return;
    }

    this.parseService.fetching = false;

    document.getElementById('showPaymentModal')?.click();
  }

  amount = 3000;
  currency = 'KES';
  async startPaymentFlutterwave() {
    this.toastr.info('Please wait...');
    try {
      let txRef = `jazke__${Date.now()}`;
      let payment_success = false;
      let customer = {
        email:
          this.authService.currentUser?.get('email') || 'marmope7@gmail.com',
        phone_number: this.authService.currentUser?.get('phone'),
        name: this.authService.currentUserName,
      };

      let amount = this.amount;
      let currency = this.currency;

      this.toastr.info('Please wait. Connecting...');
      // let PaymentRequest = Parse.Object.extend('JazkeGatewayPayment')
      // let payment = new PaymentRequest()
      // payment.set('type', 'flutterwave')
      // payment.set('amount', amount)
      // payment.set('txRef', txRef)
      // payment.set('customer', customer)

      // if (this.authService.currentUser) {
      //   payment.set('loggedInUser', this.authService.currentUser.toJSON())
      //   payment.set('userId', this.authService.currentUser.id)
      // }

      console.log('Using subaccount', 'RS_06');

      let x = FlutterwaveCheckout({
        public_key: this.authService.API_publicKey,
        tx_ref: txRef,
        amount: amount,
        currency: currency,
        // payment_options: "mobilemoney",
        // payment_options: this.utilsService.USE_FLUTTERWAVE_GATEWAY_FOR_MM ? "mobilemoney" : "card",
        // payment_options: this.paymentMethod == 'Mobile Money' ? "mobilemoneyuganda" : "card",
        customer: customer,

        subaccounts: [
          {
            id: 'RS_53F89D88A7CCF76915608B53EA22E9A9',
          },
        ],
        callback: (data: any) => {
          // specified callback function
          console.log(data);
          if (data.amount) {
            // this.authService.currentUser?.increment('walletBalance', data.amount)

            this.toastr.success(
              'Payment Succesful',
              `We confirm receipt of your payment (${currency} ${Number(
                this.amount
              ).toLocaleString()}). Thank you.`
            );
          }

          this.amount = 0;

          //   {
          //     "status": "successful",
          //     "customer": {
          //         "name": "Ahabwe Emmanuel",
          //         "email": "ahabweemma@gmail.com",
          //         "phone_number": "256773314578"
          //     },
          //     "transaction_id": 825225119,
          //     "tx_ref": "apptext__FDfLi2k0cc__256773314578",
          //     "flw_ref": "b694a9c7-e4c5-4703-a312-c3583d44d63f",
          //     "currency": "UGX",
          //     "amount": 500,
          //     "charged_amount": 515,
          //     "charge_response_code": "00",
          //     "charge_response_message": "Transaction is being processed",
          //     "created_at": "2023-02-02T20:35:15.000Z"
          // }
        },
        onclose: () => {
          // close modal
          console.log('close rave modal');
          this.amount = 0;
        },
        customizations: {
          title: `Jubilee Allianz`,
          description: `Paying for insurance`,
          logo: 'https://sales.jubileeallianz.co.ug/assets/img/logo.png',
        },
      });

      // await payment.save()
    } catch (error) {
      console.error(error);
      this.toastr.error('Error while creating order. Please try again.');
    }
  }

  async startPayment() {
    if (!this.paymentData.method) {
      this.toastr.error('Please select a payment method');
      return;
    }

    if (this.paymentData.method == 'card') {
      this.toastr.info(
        'Coming soon',
        'This is payment method is not yet available'
      );
      return;
    }

    if (!this.paymentData.mmNumber) {
      this.toastr.error('Please provide mobile money number');
      return;
    }

    this.toastr.info('Please wait...');

    try {
      let txRef = `jazke__${Date.now()}`;
      let payment_success = false;

      let data = this.motorService.motorQuotation;

      let kyc = this.motorData.kyc;
      this.quote.set('client', kyc);
      this.quote.set('actionType', 'purchase');
      await this.quote.save();
      let client = this.quote.get('client');

      let amount = data.grossPremium;
      let currency = this.currency;

      this.toastr.info('Please wait. Connecting...');
      let PaymentRequest = Parse.Object.extend('JazkeSale');
      let payment: Parse.Object = new PaymentRequest();
      payment.set('type', 'flutterwave');
      payment.set('amount', amount);
      payment.set('outstandingPremium', amount);
      payment.set('txRef', txRef);
      payment.set('quotation_id', this.quote.id);
      payment.set('quotation', this.quote);
      payment.set('insurance_type', this.quote.get('insurance_type'));
      payment.set('installments', this.installments);
      payment.set('installment_type', this.paymentData.installment_type);

      payment.set('business_status', 'NEW');
      payment.set('risk_code', this.dataService.generateNumber('RC'));

      payment.set('risk_note_no', this.dataService.generateNumber('RNN'));
      payment.set('debit_note_no', this.dataService.generateNumber('DBN'));
      payment.set('endorsement_no', this.dataService.generateNumber('EDN'));
      payment.set('endorsement_date', new Date());
      // payment.set('old_policy_no', 'XXX');

      if (client) {
        payment.set('client', client);
        payment.set('client_code', client.code);
        payment.set('client_email', client.email);
        payment.set('client_phone_number', client.phone);
        payment.set('client_name', client.name);
        payment.set('vehicle_reg_number', client.registrationNumber);
      }

      payment.set('insurance_data', this.motorData);
      payment.set(
        'risk_id',
        `1/${this.motorData?.vehicle?.registrationNumber}`
      );

      let agent_email;

      if (this.authService.currentUser) {
        let agent = {
          email:
            this.authService.currentUser?.get('email') ||
            'intermediary.administration@allianz.com',
          phone_number: this.authService.currentUser?.get('phone'),
          name: this.authService.currentUserName,
        };

        agent_email = agent.email;

        payment.set('agent', agent);
        payment.set('agent_username', this.authService.currentLoginUserName);
        payment.set('agent_name', this.authService.currentUserName);
        payment.set('loggedInUser', this.authService.currentUser.toJSON());
        payment.set(
          'loggedInUserPointer',
          this.authService.currentUser.toPointer()
        );
        payment.set('userId', this.authService.currentUser.id);
        payment.set('user_id', this.authService.currentUser.id);
        payment.set('agent_code', this.authService.currentAgentCode);
        payment.set(
          'premia_access_token',
          this.authService.currentUser.get('premia_access_token')
        );
      }

      let cert_class = this.motorService.certificateClass.find((c) => {
        if (c.label == this.motorService.motorQuotation.makeModel) {
          return true;
        }
        return false;
      });

      payment.set('cert_class', cert_class);

      this.parseService.fetching = true;

      await payment.save();

      let phone = String(this.paymentData.mmNumber).replace('+', '');
      if (phone.includes('254')) {
      } else {
        phone = `254${phone}`;
      }

      let host = window.location.host;
      let pdfHost = `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io`;
      console.log('host', pdfHost);
      console.log('saleId', payment.id);

      let res = await Parse.Cloud.run('paympesa', {
        phone: phone,
        certificateClass: cert_class,
        motorProductType: this.motorService.motorProductType,
        sale_id: payment.id,
        sale_data: payment.toJSON(),
        quote_id: this.quote.id,
        quote_data: this.quote.get('quoteData'),
        client: client,
        agent_email: agent_email,
        client_email: this.vehicle.pemail,
        host: pdfHost,
      });
      console.log('response', res);
      let json = res;

      console.log('mm response', json);

      let ResponseDescription = json['ResponseDescription'];
      let CheckoutRequestID = json['CheckoutRequestID'];

      payment.set('payment_response', json);
      payment.set('responseDescription', ResponseDescription);
      payment.set('checkoutRequestID', CheckoutRequestID);

      this.listenForChanges(payment);

      payment.set('paymentStatus', ResponseDescription);

      if (ResponseDescription == 'Success. Request accepted for processing') {
        if (phone.endsWith('708374149')) {
          this.router.navigate(['/motor-payment-success', payment.id]);

          this.parseService.fetching = false;

          // {
          //   "MerchantRequestID": "7071-4170-a0e4-8345632bad442222021",
          //   "CheckoutRequestID": "ws_CO_04092024152845805708374149",
          //   "ResponseCode": "0",
          //   "ResponseDescription": "Success. Request accepted for processing",
          //   "CustomerMessage": "Success. Request accepted for processing"
          // }
          document.getElementById('paymentcancelbutton')?.click();
        }

        // payment.set('outstandingPremium', 0);
        // if (this.paymentData.installment_type == '1') {
        //   payment.set('outstandingPremium', 0);
        // } else if (this.paymentData.installment_type == '2') {
        //   payment.set('outstandingPremium', 0);
        // } else if (this.paymentData.installment_type == '3') {
        //   payment.set('outstandingPremium', 0);
        // }
      } else {
      }

      payment.save();
    } catch (error) {
      console.error(error);
      this.toastr.error('Error while creating order. Please try again.');
    }
  }

  async listenForChanges(payment: any) {
    let query = new Parse.Query('JazkeSale');
    query.equalTo('checkoutRequestID', payment.get('checkoutRequestID'));
    query.equalTo('responseDescription', payment.get('responseDescription'));

    let subscription = await query.subscribe();

    subscription.on('open', () => {
      console.log('subscription opened');
    });

    subscription.on('create', (object) => {
      console.log('object created', object);
    });

    subscription.on('update', (object) => {
      console.log('object updated', object);
      let status = object.get('paymentStatus') || '';
      if (status) {
        this.toastr.info(status);
      }

      if (object.get('paid')) {
        this.parseService.fetching = false;
        document.getElementById('paymentcancelbutton')?.click();
        this.router.navigate(['/motor-payment-success', payment.id]);
        subscription.unsubscribe();
      }
    });

    // let object = await query.first()
    // if (object) {

    // }
  }
}
