import { Injectable } from '@angular/core';
import * as quotationObj from '../_helpers/premia.json';

@Injectable({
  providedIn: 'root',
})
export class MotorService {
  motorClasses: any = [
    { id: 'private', name: 'MOTOR PRIVATE', label: 'Private' },
    { id: 'commercial', name: 'MOTOR COMMERCIAL', label: 'Commercial' },
  ];
  
  makeModels: any = [
    {
      name: 'Subaru, Probox, Succeed, Sienta, Noah or Voxy',
      class: 'private',
      label: 'SubaruProboxEtc',
    },
    {
      name: 'Acura, Cadillac, Citroen, Ferrari, Lamborghini, Bentley, Maserati, MG, AlSuper cars, American Trucks, Dodge',
      class: 'private',
      label: 'Rare & Unique Models',
    },
    {
      name: 'Any Other Make or Model',
      class: 'private',
      label: 'AllOtherVehicleMakes',
    },
    {
      name: 'General Cartage',
      class: 'commercial',
      label: 'MotorCommercialGeneralCartage',
      motorSubclass: 'General Cartage',
    },
    {
      name: 'Own Goods',
      class: 'commercial',
      label: 'MotorCommercialOwnGoods',
      motorSubclass: 'Own Goods',
    },
    {
      name: 'PSV Tours (ChauffeurDriven) - Corporates Only',
      class: 'commercial',
      label: 'PSVTours',
      motorSubclass:
        'TSV Chauffeur Driven (Vehicle must be registered in the name of the TSV company)',
    },
    {
      name: 'Tankers - Carrying flammable Liquid',
      class: 'commercial',
      label: 'Tankers',
      motorSubclass: 'Tankers - Carrying Flammable products',
    },
    {
      name: 'Driving School Vehicles',
      class: 'commercial',
      label: 'DrivingSchool',
      motorSubclass:
        'Driving School (Vehicles must be registered in the name of the Driving school)',
    },
    {
      name: 'School Buses/Vans Staff, Buses/Vans, Church Buses/Vans',
      class: 'commercial',
      label: 'MotorCommercialInstitutional',
      motorSubclass:
        'Institutions (Vehicle must be registered in the name of the Institution)',
    },
    {
      name: 'Agricultural & Forestry Vehicles, Tracktors, Harvesters, Cranes, Forklift, Rollers, Excavators',
      class: 'commercial',
      label: 'SpecialVehiclesAgricultural',
      motorSubclass:
        'Special vehicle - Agricultural & Forest vehicles (Tractors, Harvestors, Cranes, Excavators, etc)',
    },
    {
      name: 'Ambulance',
      class: 'commercial',
      label: 'SpecialVehiclesAmbulance',
      motorSubclass: 'Special vehicle - Ambulance',
    },
    {
      name: 'Fire Fighters',
      class: 'commercial',
      label: 'SpecialVehiclesFireFighters',
      motorSubclass: 'Special vehicle - Fire Engine',
    },
  ];

  certificateClass: any = [
    {
      class: 'private',
      label: 'SubaruProboxEtc',
      cert_class: 'Class C'
    },
    {
      cert_class: 'Class C',
      class: 'private',
      label: 'Rare & Unique Models',
    },
    {
      cert_class: 'Class C',
      class: 'private',
      label: 'AllOtherVehicleMakes',
    },
    {
      name: 'General Cartage',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'MotorCommercialGeneralCartage',
      motorSubclass: 'General Cartage',
    },
    {
      name: 'Own Goods',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'MotorCommercialOwnGoods',
      motorSubclass: 'Own Goods',
    },
    {
      name: 'PSV Tours (ChauffeurDriven) - Corporates Only',
      cert_class: 'Class A',
      class: 'commercial',
      label: 'PSVTours',
      motorSubclass:
        'TSV Chauffeur Driven (Vehicle must be registered in the name of the TSV company)',
    },
    {
      name: 'Tankers - Carrying flammable Liquid',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'Tankers',
      motorSubclass: 'Tankers - Carrying Flammable products',
    },
    {
      name: 'Driving School Vehicles',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'DrivingSchool',
      motorSubclass:
        'Driving School (Vehicles must be registered in the name of the Driving school)',
    },
    {
      name: 'School Buses/Vans Staff, Buses/Vans, Church Buses/Vans',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'MotorCommercialInstitutional',
      motorSubclass:
        'Institutions (Vehicle must be registered in the name of the Institution)',
    },
    {
      name: 'Agricultural & Forestry Vehicles, Tracktors, Harvesters, Cranes, Forklift, Rollers, Excavators',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'SpecialVehiclesAgricultural',
      motorSubclass:
        'Special vehicle - Agricultural & Forest vehicles (Tractors, Harvestors, Cranes, Excavators, etc)',
    },
    {
      name: 'Ambulance',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'SpecialVehiclesAmbulance',
      motorSubclass: 'Special vehicle - Ambulance',
    },
    {
      name: 'Fire Fighters',
      cert_class: 'Class B',
      class: 'commercial',
      label: 'SpecialVehiclesFireFighters',
      motorSubclass: 'Special vehicle - Fire Engine',
    },
  ];

  lossOfUseBenefit: any = [
    { time: '30 Days', benefit: 13500, motorSubclass: 'Standard Auto' },
    { time: '20 Days', benefit: 9000, motorSubclass: 'Standard Auto' },
    { time: '10 Days', benefit: 4500, motorSubclass: 'Standard Auto' },
    { time: 'None', benefit: 0, motorSubclass: 'Standard Auto' },
    { time: '30 Days', benefit: 22500, motorSubclass: 'Premier Auto' },
    { time: '20 Days', benefit: 15000, motorSubclass: 'Premier Auto' },
    { time: '10 Days', benefit: 7500, motorSubclass: 'Premier Auto' },
    { time: 'None', benefit: 0, motorSubclass: 'Premier Auto' },
  ];

  passengerLegalLiabiltyObject: any = [
    { passengers: 'None', benefit: 0 },
    { passengers: '1 Passenger', benefit: 500 },
    { passengers: '2 Passengers', benefit: 1000 },
  ]

  motorProductType: any = [
    { name: 'Comprehensive', code: '01' },
    { name: 'Third Party Fire And Theft', code: '02' },
    { name: 'Third Party Only', code: '03' },
  ]

  companyDivision: any = [
    {
      divn_code: "105",
      divn_name: "Kisumu"
    },
    {
      divn_code: "104",
      divn_name: "Mombasa"
    },
    {
      divn_code: "101",
      divn_name: "JAZK HQ"
    },
    {
      divn_code: "103",
      divn_name: "Westlands"
    },
    {
      divn_code: "106",
      divn_name: "Nakuru"
    },
    {
      divn_code: "107",
      divn_name: "Eldoret"
    },
    {
      divn_code: "108",
      divn_name: "Thika"
    },
    {
      divn_code: "109",
      divn_name: "Meru"
    },
    {
      divn_code: "110",
      divn_name: "Nyeri"
    },
    {
      divn_code: "111",
      divn_name: "Kisii"
    },
    {
      divn_code: "112",
      divn_name: "Bungoma"
    },
    {
      divn_code: "100",
      divn_name: "Kenya"
    },
    {
      divn_code: "102",
      divn_name: "Capital Centre"
    },
    {
      divn_code: "113",
      divn_name: "Customer Service Group (CSG)"
    },
    {
      divn_code: "114",
      divn_name: "Assessment Centre (MR & Skymall)"
    },
    {
      divn_code: "115",
      divn_name: "UPPER HILL"
    },
    {
      divn_code: "116",
      divn_name: "EASTLEND'S"
    },
    {
      divn_code: "117",
      divn_name: "JUBILEE EXCHANGE"
    },
    {
      divn_code: "118",
      divn_name: "Digital Lab"
    },
    {
      divn_code: "119",
      divn_name: "NBI Region Agency 4"
    },
    {
      divn_code: "120",
      divn_name: "NBI Region Agency 5"
    },
    {
      divn_code: "121",
      divn_name: "NBI Region Agency 1"
    },
    {
      divn_code: "122",
      divn_name: "NBI Region Agency 2"
    },
    {
      divn_code: "123",
      divn_name: "NBI Region Agency 3"
    },
    {
      divn_code: "124",
      divn_name: "NBI Region HQ"
    },
    {
      divn_code: "125",
      divn_name: "ALLIANZ"
    },
    {
      divn_code: "126",
      divn_name: "P9 Policies"
    }
  ]

  productSectAssociation: any = [
    {
      sec_code: "100101",
      sec_desc: "Motor Commercial"
    },
    {
      sec_code: "100201",
      sec_desc: "Motor Private"
    },
    {
      sec_code: "100204",
      sec_desc: "JUBILEE 24\/7"
    },
    {
      sec_code: "100203",
      sec_desc: "Lady Jubilee"
    },
    {
      sec_code: "100209",
      sec_desc: "Prime Auto"
    }
  ]


  motorQuotation = {
    motorProductTypeName: '',
    motorProductTypeCode: '',
    motorproductSectAssCode: '',
    serialNumber: '',
    motorId: '',
    motorProductCode: '',
    motorClass: '',
    vehicleRegNumber: '',
    motorClassCode: '',
    motorSubclass: '',
    makeModel: '',
    vehicleMake: '',
    vehicleModel: '',
    numberPlate: '',
    referToHQ: 'No',
    yearOfManufacture: 0,
    vehicleAge: 0,
    sumInsured: 0,
    basicPremium: 0,
    pvtBenefit: 0,
    pvtInterest: '',
    excessProtectorBenefit: undefined,
    excessProtectorInterest: '',
    courtesyCarBenefit: 0,
    courtesyCarInterest: '',
    aaRoadRescueBenefit: 0,
    aaRoadRescueInterest: '',
    windScreenBenefit: 0,
    windScreenExtraBenefit: 0,
    radioCassetteBenefit: 0,
    radioCassetteExtraBenefit: 0,
    passengerLegalLiabilityBenefit: 0,
    noOfPassengers: '',
    vehicleDisabled: false,
    quoteDB: undefined,
    netPremium: 0,
    levies: 0,
    stampDuty: 40,
    grossPremium: 0,
  };

  // Data structures for premium calculation
  private standardAutoRates = {
    AllOtherVehicleMakes: {
      upTo15Years: [
        { range: [500000, 1000000], rate: 0.06 },
        { range: [1000001, 1500000], rate: 0.05 },
        { range: [1500001, 2500000], rate: 0.04 },
      ],
      minimumPremium: 37500, // Minimum premium for AllOtherVehicleMakes
    },
    SubaruProboxEtc: {
      upTo10Years: [
        { range: [500000, 1000000], rate: 0.075 },
        { range: [1000001, 1500000], rate: 0.0725 },
        { range: [1500001, 2500000], rate: 0.07 },
      ],
      minimumPremium: 37500, // Minimum premium for Subaru/Probox/etc.
    },
  };

  private commercialRates: any = {
    MotorCommercialOwnGoods: [
      { ageRange: [0, 10], rate: 0.04 },
      { ageRange: [11, 15], rate: 0.04 },
    ],
    MotorCommercialGeneralCartage: [
      { ageRange: [0, 10], rate: 0.045 },
      { ageRange: [11, 15], rate: 0.045 },
    ],
    PSVTours: [
      { ageRange: [0, 10], rate: 0 },
      { ageRange: [11, 15], rate: 0 },
    ],
    Tankers: [
      { ageRange: [0, 10], rate: 0.08 },
      { ageRange: [11, 15], rate: 0 }, // NO COVER
    ],
    DrivingSchool: [
      { ageRange: [0, 10], rate: 0.055 },
      { ageRange: [11, 15], rate: 0.055 },
    ],
    MotorCommercialInstitutional: [
      { ageRange: [0, 10], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
      { ageRange: [11, 15], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
    ],
    SpecialVehiclesAgricultural: [
      { ageRange: [0, 10], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
      { ageRange: [11, 15], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
    ],
    SpecialVehiclesAmbulance: [
      { ageRange: [0, 10], rate: 0.07 },
      { ageRange: [11, 15], rate: 0.07 },
    ],
    SpecialVehiclesFireFighters: [
      { ageRange: [0, 10], rate: 0.08 },
      { ageRange: [11, 15], rate: 0.08 },
    ],
  };

  // Minimum premiums for commercial vehicles
  private minimumPremiums: any = {
    MotorCommercialOwnGoods: 50000,
    MotorCommercialGeneralCartage: 100000,
    PSVTours: 50000,
    Tankers: 50000,
    DrivingSchool: 50000,
    MotorCommercialInstitutional: 50000,
    SpecialVehiclesAgricultural: 100000,
    SpecialVehiclesAmbulance: 50000,
    SpecialVehiclesFireFighters: 50000,
  };

  constructor() { }

  // Method to calculate the premium
  calculatePremium(
    motorClass: string,
    makeModel: string,
    yearOfManufacture: number,
    sumInsured: number
  ): number {
    //  console.log('makemodel', makeModel)
    //  this.motorQuotation.makeModel = makeModel
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - yearOfManufacture;
    let rate = 0;
    let calculatedPremium = 0;
    let minimumPremium = 0;

    if (motorClass === 'private' && sumInsured <= 2500000) {
      this.motorQuotation.motorSubclass = 'Standard Auto';
      if (makeModel === 'AllOtherVehicleMakes') {
        if (vehicleAge <= 15) {
          rate = this.getRate(
            this.standardAutoRates.AllOtherVehicleMakes.upTo15Years,
            sumInsured
          );
          calculatedPremium = rate * sumInsured;
          minimumPremium =
            this.standardAutoRates.AllOtherVehicleMakes.minimumPremium;
        }
      } else if (makeModel === 'SubaruProboxEtc') {
        if (vehicleAge <= 10) {
          rate = this.getRate(
            this.standardAutoRates.SubaruProboxEtc.upTo10Years,
            sumInsured
          );
          calculatedPremium = rate * sumInsured;
          minimumPremium =
            this.standardAutoRates.SubaruProboxEtc.minimumPremium;
        }
      }
    } else if (motorClass === 'private' && sumInsured >= 2500001) {
      this.motorQuotation.motorSubclass = 'Premier Auto';
      if (sumInsured <= 5000000) {
        rate = 0.0325;
        calculatedPremium = rate * sumInsured;
        minimumPremium = 37500;
      } else if (sumInsured >= 5000001) {
        rate = 0.03;
        calculatedPremium = rate * sumInsured;
        minimumPremium = 37500;
        this.motorQuotation.referToHQ = 'Yes';
      }
    } else if (motorClass === 'commercial') {
      this.motorQuotation.motorSubclass = this.makeModels.find(
        (model: any) => model.class === motorClass && model.label === makeModel
      ).motorSubclass;
      const rates = this.commercialRates[makeModel];
      rate = this.getRateForCommercial(rates, vehicleAge);
      calculatedPremium = rate * sumInsured;
      minimumPremium = this.minimumPremiums[makeModel];
    }

    // Ensure the calculated premium is not less than the minimum premium
    this.motorQuotation.vehicleAge = vehicleAge;
    return Math.max(calculatedPremium, minimumPremium);
  }

  // Helper method to get rate based on sum insured for private vehicles
  private getRate(rates: any[], sumInsured: number): number {
    for (const rateObj of rates) {
      if (sumInsured >= rateObj.range[0] && sumInsured <= rateObj.range[1]) {
        return rateObj.rate;
      }
    }
    return 0; // Default if no rate found
  }

  // Helper method to get rate based on vehicle age for commercial vehicles
  private getRateForCommercial(rates: any[], vehicleAge: number): number {
    for (const rateObj of rates) {
      if (
        vehicleAge >= rateObj.ageRange[0] &&
        vehicleAge <= rateObj.ageRange[1]
      ) {
        return rateObj.rate;
      }
    }
    return 0; // Default if no rate found
  }

  getModelByLabel(label: string): any {
    return this.makeModels.find((model: any) => model.label === label);
  }

  getModelPropertyByLabel<T>(
    label: string,
    property: keyof any
  ): T | undefined {
    const model = this.getModelByLabel(label);
    return model ? model[property] : undefined;
  }

  getPVT(pvtInterest: any, vehicleValue: any, motoClass: any) {
    return motoClass == 'private' ? (pvtInterest == 'yes' ? Math.max(0.0025 * vehicleValue, 3000) : 0) : (pvtInterest == 'yes' ? Math.max(0.0045 * vehicleValue, 3000) : 0);
  }

  getExcessProtector(
    excessProtectorInterest: any,
    vehicleValue: any,
    motorClass: any,
    label: any
  ) {
    if (motorClass == 'private') {
      return excessProtectorInterest == 'yes'
        ? Math.max(0.0025 * vehicleValue, 3000)
        : 0;
    } else if (label == 'MotorCommercialGeneralCartage') {
      return excessProtectorInterest == 'yes'
        ? Math.max(0.005 * vehicleValue, 5000)
        : 0;
    } else return '';
  }

  getTimeForBenefit(benefitValue: any) {
    const benefit = this.lossOfUseBenefit.find((item: any) => item.benefit === benefitValue);
    return benefit.time;
  }

  getPassengerNo(benefitValue: any) {
    const benefit = this.passengerLegalLiabiltyObject.find((item: any) => item.benefit === benefitValue);
    return benefit.passengerS;
  }

  getAAR(aarInterest: any) {
    return aarInterest == 'yes' ? 5000 : 0;
  }

  getWindOrRadio(benefit: any, vehicleValue: any) {
    return vehicleValue <= 2500000
      ? benefit > 50000
        ? 0.1 * (benefit - 50000)
        : 0
      : benefit > 100000
        ? 0.1 * (benefit - 100000)
        : 0;
  }

  calculatePremiums() {
    // Start with basicPremium as the initial value of netPremium
    this.motorQuotation.netPremium = this.motorQuotation.basicPremium;

    for (const key in this.motorQuotation) {
      if (key.endsWith('Benefit') && key !== 'aaRoadRescueBenefit' && !key.endsWith('ExtraBenefit')) {
        //@ts-ignore
        let benefitValue = this.motorQuotation[key];

        // Check if the key is 'excessProtectorBenefit' and its value is 'Inclusive'
        if (key === 'excessProtectorBenefit' && benefitValue === 'Inclusive') {
          benefitValue = 0;
        }

        console.log(key + ' -> ' + benefitValue + ' : ' + typeof benefitValue)

        // Add the benefit value to netPremium
        this.motorQuotation.netPremium += benefitValue || 0;
      }
    }

    this.motorQuotation.levies =
      Math.round(0.0045 * Number(this.motorQuotation.netPremium));

    // Calculate grossPremium as the sum of netPremium, levies, and stampDuty
    let gross =
      Number(this.motorQuotation.netPremium) +
      Number(this.motorQuotation.levies) +
      Number(this.motorQuotation.stampDuty) +
      Number(this.motorQuotation.aaRoadRescueBenefit);
    this.motorQuotation.grossPremium = Math.round(gross);
  }

  resetQuotation() {
    this.motorQuotation = {
      motorProductTypeName: '',
      motorProductTypeCode: '',
      motorproductSectAssCode: '',
      serialNumber: '',
      motorId: '',
      vehicleRegNumber: '',
      motorProductCode: '',
      motorClass: '',
      motorClassCode: '',
      motorSubclass: '',
      makeModel: '',
      vehicleMake: '',
      vehicleModel: '',
      numberPlate: '',
      referToHQ: 'No',
      yearOfManufacture: 0,
      vehicleAge: 0,
      sumInsured: 0,
      basicPremium: 0,
      pvtBenefit: 0,
      pvtInterest: '',
      excessProtectorBenefit: undefined,
      excessProtectorInterest: '',
      courtesyCarBenefit: 0,
      courtesyCarInterest: '',
      aaRoadRescueBenefit: 0,
      aaRoadRescueInterest: '',
      windScreenBenefit: 0,
      windScreenExtraBenefit: 0,
      radioCassetteBenefit: 0,
      radioCassetteExtraBenefit: 0,
      passengerLegalLiabilityBenefit: 0,
      noOfPassengers: '',
      vehicleDisabled: false,
      quoteDB: undefined,
      netPremium: 0,
      levies: 0,
      stampDuty: 40,
      grossPremium: 0,
    };
  }

  getAnyKeyValue(inHandValue: any, propertyOfInterest: keyof any, objectInQuestion: any) {
    const obj = objectInQuestion.find((pair: any) => pair.inHandValue === inHandValue);
    return obj ? obj[propertyOfInterest] : undefined;
  }

  createEmptyTemplate(originalObj: any): { [key: string]: any } {
    let template: { [key: string]: any } = {};

    for (let key in originalObj) {
      if (originalObj.hasOwnProperty(key)) {
        if (Array.isArray(originalObj[key])) {
          // Create an array of empty objects with the same structure for proposals
          template[key] = originalObj[key].map((item: any) =>
            this.createEmptyTemplate(item)
          );
        } else if (
          typeof originalObj[key] === 'object' &&
          originalObj[key] !== null
        ) {
          // Create an empty object with the same keys
          template[key] = this.createEmptyTemplate(originalObj[key]);
        } else {
          if (key == 'prc_code') {
            template[key] = originalObj[key];
          } else {
            template[key] = '';
          }

        }
      }
    }

    return {...originalObj};

    // return template;
  }


  createPremiaJson(newData: any) {
    // Create a deep copy of the imported quotationObj to allow mutations
    let updatedQuotationObj: any = this.createEmptyTemplate(quotationObj);
    // let updatedQuotationObj: any = {...quotationObj}
    console.log('quotationObj', updatedQuotationObj)

    // Update personal details
    updatedQuotationObj['quot_ref'] = newData.quotation.objectId || '';
    updatedQuotationObj['quot_paymt_ref'] = newData.objectId || '';
    updatedQuotationObj['quot_assr_name'] =
      newData.insurance_data.kyc.name || '';
    updatedQuotationObj['quot_assr_nic'] = newData.insurance_data.kyc.nin || '';
    updatedQuotationObj['quot_paymt_date'] = newData.createdAt || '';
    updatedQuotationObj['quot_assr_lic'] = '';
    updatedQuotationObj['quot_assr_pin'] = newData.insurance_data.kyc.tin || '';
    updatedQuotationObj['quot_assr_phone'] =
      newData.insurance_data.kyc.phone || '';
    updatedQuotationObj['quot_assr_email'] =
      newData.insurance_data.kyc.email || '';
    updatedQuotationObj['quot_assr_gender'] = newData.insurance_data.kyc.gender || '';
    updatedQuotationObj['quot_assr_dob'] = newData.insurance_data.kyc.dob || '';
    if(!updatedQuotationObj['quot_assr_flexi']){
      updatedQuotationObj['quot_assr_flexi'] = {
        'quot_assr_addr':{}
      }
    }
    updatedQuotationObj['quot_assr_flexi']['quot_assr_addr']['pol_addr_01'] = newData.insurance_data.kyc.address;

    // Access proposals array
    let proposals = updatedQuotationObj['proposals'];

    if (proposals && proposals.length > 0) {
      let proposal = proposals[0];
      let newQuoteData = newData.quotation.quoteData;

      // Safeguard to ensure proposal is valid
      if (proposal) {
        proposal['prop_sr_no'] = 1
        proposal['prop_paymt_ref'] = newData.objectId || '';
        proposal['prop_paymt_date'] = newData.createdAt || '';
        proposal['pol_quot_sys_id'] = 0;
        proposal['pol_comp_code'] = newData.quotation.quoteData.motorProductTypeCode || '';
        proposal['pol_divn_code'] = newData.insurance_data.companyDivision || '';
        proposal['pol_dept_code'] = newData.quotation.quoteData.motorClassCode || '';
        proposal['pol_prod_code'] = newData.quotation.quoteData.motorProductCode || '';
        proposal['pol_type'] = newData.quotation.quoteData.motorProductCode || '';
        proposal['pol_cust_code'] = '';
        proposal['pol_assr_code'] = '';
        // Update proposal dates
        proposal['pol_fm_dt'] = newData.insurance_data.coverStartDate || '';
        proposal['pol_to_dt'] = newData.insurance_data.coverEndDate || '';

        // Update policy info
        proposal['pol_quot_no'] = newData.quotation.objectId + '-' + 1 || '';
        proposal['pol_dflt_si_curr_code'] = 'KES'; // Assuming currency remains the same
        proposal['pol_prem_curr_code'] = 'KES';

        proposal['pol_flexi']['payment_mode_code']["pol_flex_10"] = "4";
        proposal['pol_flexi']['payment_mode_desc']["pol_flex_18"] = `Flutterwave - ${newData.txRef || ''} - ${newData.amount || 0}`;
        proposal['pol_flexi']['cover_type_code']["pol_flex_14"] = newData.quotation.quoteData.motorClassCode || '';
        proposal['pol_flexi']['cover_type_desc']["pol_flex_16"] = this.getAnyKeyValue(newData.quotation.quoteData.motorClassCode, 'name', this.motorProductType);
        proposal['pol_flexi']['issued_at_code']["pol_flex_01"] = 118;
        proposal['pol_flexi']['issued_at_desc']["pol_flex_17"] = "Portal Policies";
        proposal['pol_flexi']['prev_policy_no']["pol_flex_20"] = '';
        proposal['pol_flexi']['territory']["pol_flex_02"] = "KENYA";
        proposal['pol_flexi']['broker_risk_note_no']["pol_flex_08"] = '';

        proposal['proposalsections'][0]['sec_sr_no'] = '1';
        proposal['proposalsections'][0]['psec_sec_code'] = newData.quotation.quoteData.motorproductSectAssCode || '';

        // Access proposal sections and risks
        let proposalRisk =
          proposal['proposalsections']?.[0]?.['proposalrisks']?.[0];
        let vehicleData = newData.insurance_data.vehicle;

        if (proposalRisk && vehicleData) {
          // Update vehicle details
          proposalRisk['prai_flexi']['vehicle_cover_type']['prai_code_21'] = newData.quotation.quoteData.motorProductTypeCode || '';
          proposalRisk['prai_flexi']['vehicle_make']['prai_code_04'] =
            newQuoteData.vehicleMake || '';
          proposalRisk['prai_flexi']['vehicle_model']['prai_code_05'] =
            newQuoteData.vehicleModel || '';
          proposalRisk['prai_flexi']['vehicle_body_type']['prai_code_01'] =
            vehicleData.bodyType || '';
          proposalRisk['prai_flexi']['vehicle_reg_no']['prai_data_03'] =
            newQuoteData.vehicleRegNumber || '';
          proposalRisk['prai_flexi']['vehicle_chassis_no']['prai_data_01'] =
            vehicleData.chasisNumber || '';
          proposalRisk['prai_flexi']['vehicle_engine_no']['prai_data_02'] =
            vehicleData.EngineNumber || '';
          proposalRisk['prai_flexi']['vehicle_yom']['prai_num_01'] =
            newQuoteData.yearOfManufacture || 0;
          proposalRisk['prai_flexi']['vehicle_value']['prai_num_02'] =
            newQuoteData.sumInsured || 0;
          proposalRisk['prai_flexi']['vehicle_cc']['prai_num_04'] = newData.insurance_data.vehicle.cc || '';
          proposalRisk['prai_flexi']['seating_capacity']['prai_num_09']  = newData.insurance_data.vehicle.seatingCapacity || '';;
          proposalRisk['prai_flexi']['num_pax']['prai_num_03'] = newData.insurance_data.vehicle.numPassengers || '';
          proposalRisk['prai_flexi']['vehicle_tonnage']['prai_num_14'] = newData.insurance_data.vehicle.tonnage || '';

          // Update cover details in proposal
          proposalRisk['proposalcovers']?.forEach((cover: any) => {
            switch (cover['prc_code']) {
              case '3101': // Own Damage
                cover.prc_desc = 'Own Damage';
                cover.cvr_sr_no = 1;
                cover['prc_rate'] = newQuoteData.excessProtectorBenefit || 0;
                cover.prc_rate_per = 1;
                cover['prc_si_fc'] = newQuoteData.sumInsured || 0;
                cover['prc_prem_fc'] = newQuoteData.excessProtectorBenefit || 0;
                break;
              case '3176': // Third Party Only
                cover.prc_desc = 'Third Party Only'
                cover.cvr_sr_no = 2;
                cover['prc_rate'] = 0;
                cover.prc_rate_per = 1;
                cover['prc_si_fc'] = newQuoteData.sumInsured;
                cover['prc_prem_fc'] = 0;
                break;
              case '3109': // Windscreen
                cover.prc_desc = 'Windscreen'
                cover.cvr_sr_no = 3;
                cover['prc_rate'] = newQuoteData.windScreenBenefit || 0;
                cover.prc_rate_per = 1;
                cover['prc_si_fc'] = newQuoteData.sumInsured || 0;
                cover['prc_prem_fc'] = newQuoteData.windScreenBenefit || 0;
                break;
              case '3110': // Radio Cassette
                cover.prc_desc = 'Radio Cassette'
                cover.cvr_sr_no = 4;
                cover['prc_rate'] = newQuoteData.radioCassetteBenefit || 0;
                cover.prc_rate_per = 1;
                cover['prc_si_fc'] = newQuoteData.sumInsured;
                cover['prc_prem_fc'] = newQuoteData.radioCassetteBenefit || 0;
                break;
              case '3198': // Excess Protector
                cover.prc_desc = 'Excess Protector'
                cover.cvr_sr_no = 5;
                cover['prc_rate'] = newQuoteData.excessProtectorBenefit || 0;
                cover.prc_rate_per = 1;
                cover['prc_si_fc'] = newQuoteData.sumInsured;
                cover['prc_prem_fc'] = newQuoteData.excessProtectorBenefit || 0;
                break;
              case '3199': // Political Violence and Terrorism
                cover.prc_desc = 'Political Violence and Terrorism'
                cover.cvr_sr_no = 6;
                cover['prc_rate'] = newQuoteData.pvtBenefit || 0;
                cover.prc_rate_per = 1;
                cover['prc_si_fc'] = newQuoteData.sumInsured || 0;
                cover['prc_prem_fc'] = newQuoteData.pvtBenefit || 0;
                break;
            }
          });

          // Update Certificate details
          proposalRisk['proposalmotorcerts'][0]['cert_sr_no'] = 1;
          proposalRisk['proposalmotorcerts'][0]['prai_flexi']['cert_mode']['prai_data_08'] = '02';
          proposalRisk['proposalmotorcerts'][0]['prai_flexi']['cert_type']['prai_code_14'] = this.getAnyKeyValue(newData.quotation.quoteData.makeModel, 'cert_class', this.certificateClass);
          proposalRisk['proposalmotorcerts'][0]['prai_flexi']['book_id']['prai_data_09'] = "DIGI_CERT";
          if(newData.dmvic_cert.callbackObj && newData.dmvic_cert.callbackObj.issueCertificate){
            proposalRisk['proposalmotorcerts'][0]['prai_flexi']['cert_num']['prai_data_05'] = newData.dmvic_cert.callbackObj.issueCertificate.actualCNo;
          }
          
          proposalRisk['proposalmotorcerts'][0]['prai_flexi']['cert_fm_dt']['prai_date_21'] = newData.insurance_data.coverStartDate || '';
          proposalRisk['proposalmotorcerts'][0]['prai_flexi']['cert_to_dt']['prai_date_22'] = newData.insurance_data.coverEndDate || '';
          proposalRisk['proposalmotorcerts'][0]['prai_flexi']['cert_name']['prai_data_10'] = '';

        }
      }
    }

    delete updatedQuotationObj.default;

    // Return updated object
    return updatedQuotationObj;
  }
}
