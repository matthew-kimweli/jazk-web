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
      motorSubclass: 'Own Good',
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

  lossOfUseBenefit: any = [
    { time: '30 Days', benefit: 13500 },
    { time: '20 Days', benefit: 9000 },
    { time: '10 Days', benefit: 4500 },
  ];

  motorQuotation: any = {
    motorClass: '',
    motorSubclass: '',
    makeModel: '',
    numberPlate: '',
    referToHQ: 'No',
    yearOfManufacture: 0,
    vehicleAge: 0,
    sumInsured: 0,
    basicPremium: 0,
    pvtBenefit: 0,
    excessProtectorBenefit: 0,
    courtesyCarBenefit: 0,
    aaRoadRescueBenefit: 0,
    windScreenBenefit: 0,
    radioCassetteBenefit: 0,
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

  constructor() {}

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

  getPVT(pvtInterest: any, vehicleValue: any) {
    return pvtInterest == 'yes' ? Math.max(0.0025 * vehicleValue, 3000) : 0;
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
      if (key.endsWith('Benefit') && key !== 'aaRoadRescueBenefit') {
        let benefitValue = this.motorQuotation[key];

        // Check if the key is 'excessProtectorBenefit' and its value is 'Inclusive'
        if (key === 'excessProtectorBenefit' && benefitValue === 'Inclusive') {
          benefitValue = 0;
        }

        // Add the benefit value to netPremium
        this.motorQuotation.netPremium += benefitValue;
      }
    }

    this.motorQuotation.levies =
      0.0045 * Number(this.motorQuotation.netPremium);

    // Calculate grossPremium as the sum of netPremium, levies, and stampDuty
    let gross =
      Number(this.motorQuotation.netPremium) +
      Number(this.motorQuotation.levies) +
      Number(this.motorQuotation.stampDuty) +
      Number(this.motorQuotation.aaRoadRescueBenefit);
    this.motorQuotation.grossPremium = Math.round(gross);
  }
}
