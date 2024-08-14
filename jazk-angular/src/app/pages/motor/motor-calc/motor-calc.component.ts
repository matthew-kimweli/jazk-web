import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { FooterComponent } from '../../_components/footer/footer.component';
import { MotorService } from '../../../services/motor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-motor-calc',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './motor-calc.component.html',
  styleUrl: './motor-calc.component.css'
})
export class MotorCalcComponent implements OnInit {

  motorClass: any = '';
  makeModel: any = '';

  // motorClass: any = [{id: 'private', name: 'MOTOR PRIVATE'}, {id: 'commercial', name: 'MOTOR COMMERCIAL'}];
  // makeModel: any = [
  //   {name: 'Subaru, Probox, Succeed, Sienta, Noah or Voxy', class: 'private'},
  //   {name: 'Acura, Cadillac, Citroen, Ferrari, Lamborghini, Bentley, Maserati, MG, AlSuper cars, American Trucks, Dodge', class: 'private'},
  //   {name: 'Any Other Make or Model', class: 'private'},
  //   {name: 'General Cartage', class: 'commercial'},
  //   {name: 'Own Goods', class: 'commercial'},
  //   {name: 'PSV Tours (ChauffeurDriven) - Corporates Only', class: 'commercial'},
  //   {name: 'Tankers - Carrying flammable Liquid', class: 'commercial'},
  //   {name: 'Driving School Vehicles', class: 'commercial'},
  //   {name: 'School Buses/Vans Staff, Buses/Vans, Church Buses/Vans', class: 'commercial'},
  //   {name: 'Agricultural & Forestry Vehicles, Tracktors, Harvesters, Cranes, Forklift, Rollers, Excavators', class: 'commercial'},
  //   {name: 'Ambulance', class: 'commercial'},
  //   {name: 'Fire Fighters', class: 'commercial'}
  // ];

  constructor(public motorService : MotorService) {}

  ngOnInit(): void {}

}
