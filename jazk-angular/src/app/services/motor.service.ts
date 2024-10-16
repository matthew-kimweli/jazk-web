import { Injectable } from '@angular/core';

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

  certificateClass = [
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


}
