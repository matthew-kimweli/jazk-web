import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UtilsService } from '../../../services/utils.service';
import { ToastrService } from 'ngx-toastr';
import vehicleData from '../../../_helpers/vehicleMake.json';
import bodyTypeData from '../../../_helpers/bodyType.json';
import { HeaderComponent } from '../../_components/header/header.component';
import * as Parse from "parse";


declare var FlutterwaveCheckout: any;

@Component({
  selector: 'app-motor-kyc',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './motor-kyc.component.html',
  styleUrl: './motor-kyc.component.css'
})
export class MotorKycComponent {

  acceptTerms: any;
  userDeclarationYes: any;
  logBookDeclarationYes: any;
  vehiclePhotosDeclarationYes: any;
  privacyNoticeDeclarationYes: any;
  ownershipDeclarationYes: any;
  inspectionVehicleDeclarationYes: any;
  pfname: any;
  plname: any;
  pphone: any;
  pemail: any;
  pCity: any;
  pAddress: any;
  pTin: any;
  pAge: any;
  pDob: any;
  createAccountForMe: any = true;
  user: Parse.Object<Parse.Attributes> | undefined;

  vehicleMakes: any = Object.keys(vehicleData);
  vehicleModels: any = vehicleData;
  bodyTypes: any = bodyTypeData.VEHICLE_BODY_TYPES;
  tYears: any = [];

  today: any
  minDate: any;

  vehicles: any;
  twoType = [{ id: 'yes', name: 'Yes' }, { id: 'no', name: 'No' }];
  banks_mfis: any = [
    "ABC Capital Bank Uganda Limited",
    "Absa Bank Uganda Limited",
    "Bank of Africa Uganda Limited",
    "Bank of Baroda Uganda Limited",
    "Bank of India (Uganda) Limited",
    "Cairo Bank Uganda Ltd",
    "Centenary Rural Development Bank Limited",
    "Citibank Uganda Limited",
    "DFCU Bank Limited",
    "Diamond Trust Bank Uganda Limited",
    "Ecobank Uganda Limited",
    "Equity Bank Uganda Limited",
    "Exim Bank Uganda Limited",
    "Finance Trust Bank Limited",
    "Guaranty Trust Bank (Uganda) Limited",
    "Housing Finance Bank Uganda Limited",
    "KCB Bank Uganda Limited",
    "NCBA Bank Uganda Limited",
    "Opportunity Bank Uganda Limited",
    "I&M Bank (Uganda) Limited",
    "Stanbic Bank Uganda Limited",
    "Standard Chartered Bank Uganda Limited",
    "Tropical Bank Limited",
    "United Bank for Africa Uganda Limited",
    "Postbank (U) Limited",
    "BRAC Uganda Bank Limited",
    "Mercantile Credit Bank Limited",
    "Yako Bank Uganda Limited",
    "Top Finance Bank Limited",
    "BRAC Uganda Bank Limited",
    "Mercantile Credit Bank Limited",
    "Yako Bank Uganda Limited",
    "Top Finance Bank Limited",
    "EFC Uganda Limited",
    "FINCA Uganda Limited",
    "PRIDE Microfinance Limited",
    "UGAFODE Limited",
    "EFC Uganda Limited",
    "FINCA Uganda Limited",
    "PRIDE Microfinance Limited",
    "UGAFODE Limited"
  ]

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

  vehicleMakeNotSelected = true;
  selectedVehicle: any;
  selectedVehicleMake: any;
  minDob: any;

  coverStartDate: any;
  coverEndDate: any;
  maxCoverDate: any;

  termsUrl: any = 'https://www.beanafrica.com/Allianz/ug/PolicyDocs/Private%20Motor%20Insurance%20Policy.pdf';


  constructor(
    public utilsService: UtilsService,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.getToday()
  }

  getToday() {
    var date = new Date(); // create a new date object
    var formattedDate = date.toISOString().substring(0, 10); // format the date as yyyy-mm-dd and remove the time and timezone
    console.log(formattedDate); // output the formatted date
    this.today = formattedDate;
    this.minDate = formattedDate

    var minDobDate = new Date();
    minDobDate.setFullYear(date.getFullYear() - 16)

    this.minDob = minDobDate.toISOString().substring(0, 10);

    var maxCoverDate = new Date();
    maxCoverDate.setMonth(date.getMonth() + 6)

    this.maxCoverDate = maxCoverDate.toISOString().substring(0, 10);

  }

  ngOnInit(): void {
    console.log(this.utilsService.motorData)
    let data = this.utilsService.motorData
    if (!data) {
      this.router.navigate(['motor'])
    }

    let user = this.authService.currentUser
    this.user = user;
    if (user) {
      let kyc = user.get('kyc')
      if (kyc) {
        this.pfname = kyc.fname
        this.plname = kyc.lname
        this.pAge = kyc.age
        this.pDob = kyc.dob
        this.pphone = kyc.phone
        this.pemail = kyc.email
        this.pTin = kyc.tin
        this.pCity = kyc.city
        this.pAddress = kyc.address
      }
    }

    for (let obj of this.utilsService.motorData.autoMobiles) {
      obj.vehicleDisabled = true;
      obj.IsBankOrMFIinterested = false;
    }

    this.vehicles = this.utilsService.motorData.autoMobiles;
    this.getYears();
  }

  emailIsValid(): boolean {
    // Perform additional custom validation if needed
    // You might want to add more complex validation logic here
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.pemail);
    // return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.pemail);
  }

  onVehicleMakeChanged(event: any, id: any) {
    if (event.target.value) {
      this.selectedVehicleMake = id;
      //@ts-ignore
      let obj = this.utilsService.motorData.autoMobiles.find(obj => obj.motorId === id);
      obj.vehicleDisabled = false;
      // this.vehicleMakeNotSelected = false;
    }
  }

  onbankInterestChanged(event: any, id: any) {
    if (event.target.value && event.target.value === 'yes') {
      this.selectedVehicle = id;
      //@ts-ignore
      let obj = this.utilsService.motorData.autoMobiles.find(obj => obj.motorId === id);
      obj.IsBankOrMFIinterested = true;
      // this.bankOrMFIInterested = true;
    } else {
      //@ts-ignore
      let obj = this.utilsService.motorData.autoMobiles.find(obj => obj.motorId === id);
      obj.IsBankOrMFIinterested = false;
      // Remove the .bankOrMFI .vehicleModel property if it exists
      if (obj) {
        if (obj.hasOwnProperty('bankOrMFI')) {
          delete obj.bankOrMFI;
        }
      }
    }
  }

  getYears() {
    let tyear = new Date().getFullYear()
    for (let index = 0; index < 100; index++) {
      this.tYears.push(tyear--)
    }
  }

  onDobChanged(event: any) {
    let value = event.target.value;
    if (value) {
      let today = new Date()
      let dob = new Date(value)
      this.pDob = dob
      let age = today.getFullYear() - dob.getFullYear()
      this.pAge = age
    }
    if (this.pAge < 16) {
      this.pAge = '-'
      setTimeout(() => {
        this.pAge = ''
      }, 400);
      this.toastr.error('Policyholder should be above 16 years of age.')
    }

  }

  onCoverDateChanged(event: any) {
    let value = event.target.value;
    if (value) {
      let coverStart = new Date(value)
      this.coverStartDate = coverStart.toISOString().substring(0, 10);

      let d1 = new Date(coverStart.setFullYear(coverStart.getFullYear() + 1))
      let result = new Date(d1.setDate(d1.getDate() - 1))
      this.coverEndDate = result.toISOString().substring(0, 10);

    }

  }

  onSelectManufactureYear(event: any, vehicle: any) {
    let year = event.target.value;
    let currentYear = new Date().getFullYear()
    let minPrivateYear = currentYear - 25
    let minCommercialYear = currentYear - 20
    if (year < minPrivateYear) {
      vehicle.yearOfManufacture = '-'
      setTimeout(() => {
        vehicle.yearOfManufacture = ''
      }, 400);
      this.toastr.error('Please note we only insure vehicles for private use whose age is not more than 25 years from the year of manufacture.')
    } else if (year < minCommercialYear) {
      vehicle.yearOfManufacture = '-'
      setTimeout(() => {
        vehicle.yearOfManufacture = ''
      }, 400);
      this.toastr.error('Please note we only insure vehicles for commercial use whose age is not more than 25 years from the year of manufacture.')
    }
  }

  buyNow() {

    console.log(this.utilsService.motorData);


    if (!this.pfname) {
      this.toastr.error("First name is required")
      return
    }

    // if (!this.plname) {
    //   this.toastr.error("Last name is required")
    //   return
    // }

    // if (!this.pDob) {
    //   this.toastr.error("Date of Birth is required")
    //   return
    // }



    if (!this.pphone) {
      this.toastr.error("Phone number is required")
      return
    }

    if (this.pphone.startsWith('07') || this.pphone.startsWith('7')) {
      this.pphone = '256' + Number(this.pphone).toString()
      // this.toastr.error("Invalid phone. Please include your country code")
      // return
    }

    if (!this.pemail) {
      this.toastr.error("Email is required")
      return
    }

    if (!this.emailIsValid()) {
      this.toastr.error("Please enter a valid email address")
      return
    }

    if (!this.pCity) {
      this.toastr.error("City is required")
      return
    }
    if (!this.pAddress) {
      this.toastr.error("Address of residence is required")
      return
    }

    if (!this.pTin) {
      this.toastr.error("TIN is required")
      return
    }

    if (!this.coverStartDate) {
      this.toastr.error("Cover Policy Start Date is required")
      return
    }

    for (let index = 0; index < this.vehicles.length; index++) {
      const v = this.vehicles[index];
      let count = index + 1;
      if (!v.vehicleMake) {
        this.toastr.error(`Please provide make of vehicle ${count}`)
        return
      }
      if (!v.vehicleModel) {
        this.toastr.error(`Please provide model of vehicle ${count}`)
        return
      }
      if (!v.bodyType) {
        this.toastr.error(`Please provide body type of vehicle ${count}`)
        return
      }
      if (!v.yearOfManufacture) {
        this.toastr.error(`Please provide manufacture year of vehicle ${count}`)
        return
      }

      if (!v.EngineNumber) {
        this.toastr.error(`Please provide engine number of vehicle ${count}`)
        return
      }
      if (!v.registrationNumber) {
        this.toastr.error(`Please provide registration number of vehicle ${count}`)
        return
      }

      if (!v.chasisNumber) {
        this.toastr.error(`Please provide chasis number of vehicle ${count}`)
        return
      }

      if (!v.anyBankOrMFIInterested) {
        this.toastr.error(`Please tell us if vehicle ${count} has Bank interest or not`)
        return
      }

      if (v.anyBankOrMFIInterested === 'yes') {
        if(!v.bankOrMFI){
          this.toastr.error(`Please inform us the Bank or MFI that has an interest on the vehicle ${count}`)
          return
        }
      }
    }


    // if (!this.logBookDeclarationYes) {
    //   this.toastr.error("Please accept the log Book declaration statement to proceed")
    //   return
    // }

    // if (!this.vehiclePhotosDeclarationYes) {
    //   this.toastr.error("Please accept the vehicle photos declaration statement to proceed")
    //   return
    // }

    if (!this.acceptTerms) {
      this.toastr.error("Please accept the Terms and Conditions to proceed")
      return
    }

    if (!this.ownershipDeclarationYes) {
      this.toastr.error("Please accept the Ownership Declaration statement to proceed")
      return
    }

    if (!this.inspectionVehicleDeclarationYes) {
      this.toastr.error("Please accept the Inspection of my vehicle declaration statement to proceed")
      return
    }
  

    if (!this.userDeclarationYes) {
      this.toastr.error("Please accept the Self declaration statement to proceed")
      return
    }

    this.pphone = Number(this.pphone).toString()

    let userData = {
      fname: this.pfname,
      lname: this.plname,
      age: this.pAge,
      DoB: this.pDob,
      phone: this.pphone,
      email: this.pemail,
      tin: this.pTin,
      city: this.pCity,
      address: this.pAddress

    }

    if (this.user) {
      this.user.set('kyc', userData)
      this.user.save(userData)
    }

    this.utilsService.motorData.kyc = userData

    this.utilsService.motorData.coverStartDate = this.coverStartDate
    this.utilsService.motorData.coverEndDate = this.coverEndDate
    


    let data = this.utilsService.motorData


    // this.utilsService.showModal(BuyOptionsModalComponent, {
    //   data: {
    //     quoteData: data,
    //     userData: userData,
    //     type: 'motor'
    //   }
    // })
  }

  amount = 3000;
  currency = 'KES'
  async startPayment(){
    this.toastr.info('Please wait...')
    try {

      let txRef = `jazke__${Date.now()}`
      let payment_success = false
      let customer = {
        email: this.authService.currentUser?.get('email') || 'marmope7@gmail.com',
        phone_number: this.authService.currentUser?.get('phone'),
        name: this.authService.currentUserName,
      }

      let amount = this.amount
      let currency = this.currency


      this.toastr.info('Please wait. Connecting...')
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



      console.log('Using subaccount', 'RS_06')

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
            id: "RS_53F89D88A7CCF76915608B53EA22E9A9",
          }
        ],
        callback: (data: any) => { // specified callback function
          console.log(data);
          if (data.amount) {
            // this.authService.currentUser?.increment('walletBalance', data.amount)

            this.toastr.success("Payment Succesful", `We confirm receipt of your payment (${currency} ${Number(this.amount).toLocaleString()}). Thank you.`)
          }

          this.amount = 0

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
          console.log('close rave modal')
          this.amount = 0

        },
        customizations: {
          title: `Jubilee Allianz`,
          description: `Paying for insurance`,
          logo: 'https://sales.jubileeallianz.co.ug/assets/img/logo.png',
        },
      });

      // await payment.save()


    } catch (error) {
      console.error(error)
      this.toastr.error('Error while creating order. Please try again.')
    }

  }
}