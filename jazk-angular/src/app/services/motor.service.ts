import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  motorClasses: any = [{ id: 'private', name: 'MOTOR PRIVATE', label: 'Private' }, { id: 'commercial', name: 'MOTOR COMMERCIAL', label: 'Commercial' }];
  makeModels: any = [
    { name: 'Subaru, Probox, Succeed, Sienta, Noah or Voxy', class: 'private', label: 'SubaruProboxEtc' },
    { name: 'Acura, Cadillac, Citroen, Ferrari, Lamborghini, Bentley, Maserati, MG, AlSuper cars, American Trucks, Dodge', class: 'private', label: 'Rare & Unique Models' },
    { name: 'Any Other Make or Model', class: 'private', label: 'AllOtherVehicleMakes' },
    { name: 'General Cartage', class: 'commercial', label: 'MotorCommercialGeneralCartage', motorSubclass: 'General Cartage' },
    { name: 'Own Goods', class: 'commercial', label: 'MotorCommercialOwnGoods', motorSubclass: 'Own Good' },
    { name: 'PSV Tours (ChauffeurDriven) - Corporates Only', class: 'commercial', label: 'PSVTours', motorSubclass: 'TSV Chauffeur Driven (Vehicle must be registered in the name of the TSV company)' },
    { name: 'Tankers - Carrying flammable Liquid', class: 'commercial', label: 'Tankers', motorSubclass: 'Tankers - Carrying Flammable products' },
    { name: 'Driving School Vehicles', class: 'commercial', label: 'DrivingSchool', motorSubclass: 'Driving School (Vehicles must be registered in the name of the Driving school)' },
    { name: 'School Buses/Vans Staff, Buses/Vans, Church Buses/Vans', class: 'commercial', label: 'MotorCommercialInstitutional', motorSubclass: 'Institutions (Vehicle must be registered in the name of the Institution)' },
    { name: 'Agricultural & Forestry Vehicles, Tracktors, Harvesters, Cranes, Forklift, Rollers, Excavators', class: 'commercial', label: 'SpecialVehiclesAgricultural', motorSubclass: 'Special vehicle - Agricultural & Forest vehicles (Tractors, Harvestors, Cranes, Excavators, etc)' },
    { name: 'Ambulance', class: 'commercial', label: 'SpecialVehiclesAmbulance', motorSubclass: 'Special vehicle - Ambulance' },
    { name: 'Fire Fighters', class: 'commercial', label: 'SpecialVehiclesFireFighters', motorSubclass: 'Special vehicle - Fire Engine' }
  ];

  motorQuotation: any = {
    motorClass: '',
    motorSubclass: '',
    makeModel: '',
    referToHQ: 'No',
    yearOfManufacture: 0,
    vehicleAge: 0,
    sumInsured: 0,
    basicPremium: 0,
    netPremium: 0,
    grossPremium: 0
  };

  // Data structures for premium calculation
  private standardAutoRates = {
    'AllOtherVehicleMakes': {
      upTo15Years: [
        { range: [500000, 1000000], rate: 0.06 },
        { range: [1000001, 1500000], rate: 0.05 },
        { range: [1500001, 2500000], rate: 0.04 },
      ],
      minimumPremium: 37500 // Minimum premium for AllOtherVehicleMakes
    },
    'SubaruProboxEtc': {
      upTo10Years: [
        { range: [500000, 1000000], rate: 0.075 },
        { range: [1000001, 1500000], rate: 0.0725 },
        { range: [1500001, 2500000], rate: 0.07 },
      ],
      minimumPremium: 37500 // Minimum premium for Subaru/Probox/etc.
    },
  };

  private commercialRates: any = {
    'MotorCommercialOwnGoods': [
      { ageRange: [0, 10], rate: 0.04 },
      { ageRange: [11, 15], rate: 0.04 },
    ],
    'MotorCommercialGeneralCartage': [
      { ageRange: [0, 10], rate: 0.045 },
      { ageRange: [11, 15], rate: 0.045 },
    ],
    'PSVTours': [
      { ageRange: [0, 10], rate: 0 },
      { ageRange: [11, 15], rate: 0 },
    ],
    'Tankers': [
      { ageRange: [0, 10], rate: 0.08 },
      { ageRange: [11, 15], rate: 0 } // NO COVER
    ],
    'DrivingSchool': [
      { ageRange: [0, 10], rate: 0.055 },
      { ageRange: [11, 15], rate: 0.055 },
    ],
    'MotorCommercialInstitutional': [
      { ageRange: [0, 10], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
      { ageRange: [11, 15], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
    ],
    'SpecialVehiclesAgricultural': [
      { ageRange: [0, 10], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
      { ageRange: [11, 15], rate: 0.035 }, // INCLUSIVE OF EXCESS PROTECTOR
    ],
    'SpecialVehiclesAmbulance': [
      { ageRange: [0, 10], rate: 0.07 },
      { ageRange: [11, 15], rate: 0.07 },
    ],
    'SpecialVehiclesFireFighters': [
      { ageRange: [0, 10], rate: 0.08 },
      { ageRange: [11, 15], rate: 0.08 },
    ],
  };

  // Minimum premiums for commercial vehicles
  private minimumPremiums: any = {
    'MotorCommercialOwnGoods': 50000,
    'MotorCommercialGeneralCartage': 100000,
    'PSVTours': 50000,
    'Tankers': 50000,
    'DrivingSchool': 50000,
    'MotorCommercialInstitutional': 50000,
    'SpecialVehiclesAgricultural': 100000,
    'SpecialVehiclesAmbulance': 50000,
    'SpecialVehiclesFireFighters': 50000,
  };

  constructor() { }

  // Method to calculate the premium
  calculatePremium(motorClass: string, makeModel: string, yearOfManufacture: number, sumInsured: number): number {
  //  console.log('makemodel', makeModel)
  //  this.motorQuotation.makeModel = makeModel
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - yearOfManufacture;
    let rate = 0;
    let calculatedPremium = 0;
    let minimumPremium = 0;

    if (motorClass === 'private' && sumInsured <= 2500000) {
      this.motorQuotation.motorSubclass = 'Standard Auto'
      if (makeModel === 'AllOtherVehicleMakes') {
        if (vehicleAge <= 15) {
          rate = this.getRate(this.standardAutoRates.AllOtherVehicleMakes.upTo15Years, sumInsured);
          calculatedPremium = rate * sumInsured;
          minimumPremium = this.standardAutoRates.AllOtherVehicleMakes.minimumPremium;
        }
      } else if (makeModel === 'SubaruProboxEtc') {
        if (vehicleAge <= 10) {
          rate = this.getRate(this.standardAutoRates.SubaruProboxEtc.upTo10Years, sumInsured);
          calculatedPremium = rate * sumInsured;
          minimumPremium = this.standardAutoRates.SubaruProboxEtc.minimumPremium;
        }
      }
    } else if (motorClass === 'private' && sumInsured >= 2500001) {
      this.motorQuotation.motorSubclass = 'Premier Auto'
      if (sumInsured <= 5000000) {
        rate = 0.0325
        calculatedPremium = rate * sumInsured;
        minimumPremium = 37500
      } else if (sumInsured >= 5000001) {
        rate = 0.03
        calculatedPremium = rate * sumInsured;
        minimumPremium = 37500
        this.motorQuotation.referToHQ = 'Yes';
      }
    } else if (motorClass === 'commercial') {
      this.motorQuotation.motorSubclass = this.makeModels.find((model: any) => model.class === motorClass && model.label === makeModel).motorSubclass;
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
      if (vehicleAge >= rateObj.ageRange[0] && vehicleAge <= rateObj.ageRange[1]) {
        return rateObj.rate;
      }
    }
    return 0; // Default if no rate found
  }

  getModelByLabel(label: string): any {
    return this.makeModels.find((model: any) => model.label === label);
  }

  getModelPropertyByLabel<T>(label: string, property: keyof any): T | undefined {
    const model = this.getModelByLabel(label);
    return model ? model[property] : undefined;
  }
  
}
