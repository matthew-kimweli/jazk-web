import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  motorClasses: any = [{id: 'private', name: 'MOTOR PRIVATE'}, {id: 'commercial', name: 'MOTOR COMMERCIAL'}];
  makeModels: any = [
    {name: 'Subaru, Probox, Succeed, Sienta, Noah or Voxy', class: 'private'},
    {name: 'Acura, Cadillac, Citroen, Ferrari, Lamborghini, Bentley, Maserati, MG, AlSuper cars, American Trucks, Dodge', class: 'private'},
    {name: 'Any Other Make or Model', class: 'private'},
    {name: 'General Cartage', class: 'commercial'},
    {name: 'Own Goods', class: 'commercial'},
    {name: 'PSV Tours (ChauffeurDriven) - Corporates Only', class: 'commercial'},
    {name: 'Tankers - Carrying flammable Liquid', class: 'commercial'},
    {name: 'Driving School Vehicles', class: 'commercial'},
    {name: 'School Buses/Vans Staff, Buses/Vans, Church Buses/Vans', class: 'commercial'},
    {name: 'Agricultural & Forestry Vehicles, Tracktors, Harvesters, Cranes, Forklift, Rollers, Excavators', class: 'commercial'},
    {name: 'Ambulance', class: 'commercial'},
    {name: 'Fire Fighters', class: 'commercial'}
  ];

  constructor() { }
}
