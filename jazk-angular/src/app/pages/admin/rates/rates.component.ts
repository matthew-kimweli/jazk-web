import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';
import * as Parse from 'parse';
import { IMaskModule } from 'angular-imask';
import vehicleData from '../../../_helpers/vehicleMake.json';
import TomSelect from 'tom-select';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SideMenuComponent,
    IMaskModule,
  ],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.css'
})
export class RatesComponent {
  // @ViewChild('multiSelect', { static: true }) multiSelect!: ElementRef;
  @ViewChild('multiSelectAgent', { static: true }) multiSelectAgent!: ElementRef;
  @ViewChild('multiSelectVehicleMake', { static: true }) multiSelectVehicleMake!: ElementRef;


  fetching: any;
  list: Parse.Object<Parse.Attributes>[] | undefined;

  myForm!: FormGroup;
  editForm!: FormGroup;
  data: any = { name: "", email: "", phone: "", address: "", city: "", country: "", tin: "", premiaCode: "", pvt: '', excessProtector: '', lossOfUse: '', rates: [{minVV: 0, maxVV: 0, rate: 0}] };
  editData: any = { id: "", name: "", email: "", phone: "", address: "", city: "", country: "", tin: "", premiaCode: "", pvt: '', excessProtector: '', lossOfUse: '', rates: [{minVV: 0, maxVV: 0, rate: 0}] };
  selectedObject: any;
  saving: any;
  db: any;

  states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'CO', name: 'Colorado' },
    { code: 'DE', name: 'Delaware' },
    { code: 'DC', name: 'District of Columbia' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
  ];

  coverTypes: any[] = [
    'Motor Private',
    'Motor Commercial',
    'Motor Cycle',
    'Home',
    'Personal Accident',
    'SME',
    'WIBA',
    'Marine',
  ];

  vehicleUsage: any[] = [
    "General Cartage",
    "Own Goods",
    "PSV Tours (ChauffeurDriven) - Corporates Only",
    "Tankers - Carrying flammable Liquid",
    "Driving School Vehicles",
    "School Buses/Vans, Staff Buses/Vans, Church Buses/Vans",
    "Agricultural & Forestry Vehicles, Tractors, Harvesters, Cranes, Forklift, Rollers, Excavators",
    "Ambulance",
    "Fire Fighters"
  ]

  users = [
    { id: 1, name: 'James' },
    { id: 2, name: 'Agnes' },
    { id: 3, name: 'Mark' }
  ]
  // users: Parse.Object<Parse.Attributes>[] | undefined;

  allVehicleMakes: any = true;
  vehicleMakes: any = Object.keys(vehicleData);
  control!: FormControl;
  sumInsuredMask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 500000,
  };
  ageControl!: FormControl
  ageMask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 1,
  };
  premiumControl!: FormControl;
  pvtMiniControl!: FormControl;
  excessProtectorMiniControl!: FormControl;
  lossOfUseBDControl!: FormControl;
  minVVControl!: FormControl;
  maxVVControl!: FormControl;

  premiumMask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 0,
  };

  rateControl!: FormControl;
  rateRangeControl!: FormControl;

  rateMask = {
    mask: Number,
    scale: 0,
    signed: true,
    thousandsSeparator: ',',
    padFractionalZeros: true,
    normalizeZeros: true,
    min: 0,
  };

  makes = [
    { id: 1, make: "AIBIS" },
    { id: 2, make: "AKERMAN" },
    { id: 3, make: "ALFA ROMEO" },
    { id: 4, make: "ARTIC" },
    { id: 5, make: "ASCODA" },
    { id: 6, make: "ASHOK" },
    { id: 7, make: "ASIA" },
    { id: 8, make: "ASTINA" },
    { id: 9, make: "AUDI" },
    { id: 10, make: "AUSTIN" },
    { id: 11, make: "AXLE" },
  ];

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    console.log('useers => ', this.users)

    this.myForm = this.fb.group({
      name: [this.data.name, Validators.required],
      coverType: [this.data.coverType, [Validators.required]],
      intermediary: [this.data.intermediary, Validators.required],
      intermediaries: [[]],
      vehicleMakes: [[]],
      rate: [this.data.rate, Validators.required],
      makeInterest: [this.data.makeInterest, Validators.required],
      maxVehicleAge: [this.data.maxVehicleAge, Validators.required],
      maxVehicleValue: [this.data.maxVehicleValue, Validators.required],
      miniPremium: [this.data.miniPremium, Validators.required],
      vehicleUsage: [this.data.vehicleUsage, Validators.required],
      pvt: [this.data.pvt, Validators.required],
      pvtMini: [this.data.pvtMini],
      pvtRate: [this.data.pvtRate],
      excessProtector: [this.data.excessProtector, Validators.required],
      excessProtectorMini: [this.data.excessProtectorMini],
      excessProtectorRate: [this.data.excessProtectorRate],
      lossOfUse: [this.data.lossOfUse, Validators.required],
      lossOfUseBD: [this.data.lossOfUseBD],
      lossOfUseRate: [this.data.lossOfUseRate],
      rates: this.fb.array((this.data.rates || []).map((r: any) => this.fb.group({ minVV: [r?.minVV || 0], maxVV: [r?.maxVV || 0], rate: [r?.rate || 0] })))

    });

    this.control = new FormControl<number>(this.data.maxVehicleValue);
    this.ageControl = new FormControl<number>(this.data.maxVehicleAge);
    this.premiumControl = new FormControl<number>(this.data.miniPremium);
    this.pvtMiniControl = new FormControl<number>(this.data.pvtMini);
    this.excessProtectorMiniControl = new FormControl<number>(this.data.excessProtectorMini);
    this.lossOfUseBDControl = new FormControl<number>(this.data.lossOfUseBD);
    this.rateRangeControl = new FormControl<number>(this.data.rates.rate);
    this.minVVControl = new FormControl<number>(this.data.rates.minVV);
    this.maxVVControl = new FormControl<number>(this.data.rates.maxVV);

    this.fetch();
    this.fetchUsers()

    this.editForm = this.fb.group({
      name: [this.editData.name, Validators.required],
      coverType: [this.editData.coverType, [Validators.required]],
      intermediary: [this.editData.intermediary, Validators.required],
      intermediaries: [this.editData.intermediaries],
      rate: [this.editData.rate, Validators.required],
      makeInterest: [this.editData.makeInterest, Validators.required],
      maxVehicleAge: [this.editData.maxVehicleAge, Validators.required],
      maxVehicleValue: [this.editData.maxVehicleValue, Validators.required],
      miniPremium: [this.editData.miniPremium, Validators.required],
      vehicleMakes: [this.editData.vehicleMakes],
      vehicleUsage: [this.editData.vehicleUsage, Validators.required],
      pvt: [this.editData.pvt, Validators.required],
      pvtMini: [this.editData.pvtMini],
      pvtRate: [this.editData.pvtRate],
      excessProtector: [this.editData.excessProtector, Validators.required],
      excessProtectorMini: [this.editData.excessProtectorMini],
      excessProtectorRate: [this.editData.excessProtectorRate],
      lossOfUse: [this.editData.lossOfUse, Validators.required],
      lossOfUseBD: [this.editData.lossOfUseBD],
      lossOfUseRate: [this.editData.lossOfUseRate],
      rates: this.fb.array((this.editData.rates || []).map((r: any) => this.fb.group({ minVV: [r?.minVV || 0], maxVV: [r?.maxVV || 0], rate: [r?.rate || 0] })))


    });
  }

  ngAfterViewInit() {

    const selectElement1 = this.multiSelectAgent.nativeElement;

    new TomSelect(selectElement1, {
      onChange: (values: any) => {
        this.myForm.controls['intermediaries'].setValue(values);
      }
    });

    const selectElement2 = this.multiSelectVehicleMake.nativeElement;

    new TomSelect(selectElement2, {
      onChange: (values: any) => {
        this.myForm.controls['vehicleMakes'].setValue(values);
      }
    });
  }

  submitMulti() {
    console.log('Form Output => ', this.myForm);
  }

  selectVehicleMake() {
    this.allVehicleMakes = false
  }

  addRate() {
    const fg = this.fb.group({
      minVV: [0],
      maxVV: [0],
      rate: [0],
    });
    this.rates.push(fg);
  }

  removeRate(i: any) {
    this.rates.removeAt(i);
  }

  async fetch() {
    let query = new Parse.Query("JazkeRate");
    this.list = await this.parseService.find(query);
    console.log('list', this.list)
  }

  async fetchUsers() {
    let query = new Parse.Query(Parse.User);
    // this.users = await this.parseService.find(query);
    console.log('user', this.users)
  }

  submitForm() {
    this.parseService.submitting = true;
    if (this.myForm.valid) {
      console.log("Form submitted:", this.myForm.value);
      this.save();
    } else {
      console.log("Form is invalid. Please fix errors.", this.myForm.value);
    }
  }

  async save() {
    let e;

    if (this.db) {
      e = this.db;
    } else {
      let DB = Parse.Object.extend("JazkeRate");
      e = new DB();
    }

    let user = this.users?.find(u => {
      if (u.id == this.data.intermediary) {
        return true;
      }
      return false
    })

    this.data.user = user;

    let saved = await this.parseService.save(e, this.data);
    if (saved) {
      this.toastr.success("Rate has been submitted");
      document.getElementById("cancelButton")?.click();
      this.fetch();
      this.data = {};
    }
    this.parseService.submitting = false;
  }

  async setItemToEdit(item: any, index: any) {
    this.editData.name = item.get('name')
    this.editData.coverType = item.get("coverType")
    this.editData.intermediary = item.get("intermediary")
    this.editData.intermediaries = item.get("intermediaries")
    this.editData.VehicleMakes = item.get("VehicleMakes")
    this.editData.rate = item.get("rate")
    this.editData.makeInterest = item.get("makeInterest")
    this.editData.maxVehicleAge = item.get("maxVehicleAge")
    this.editData.maxVehicleValue = item.get("maxVehicleValue")
    this.editData.items = item.get("items")
    this.editData.vehicleUsage = item.get("vehicleUsage")
    this.editData.rates = item.get("rates")
    this.selectedObject = this.list?.at(index)
  }

  submitEdits() {
    this.parseService.submitting = true;
    if (this.editForm.valid) {
      console.log('Editted Form submitted', this.editForm.value);
      this.updateItem()
    } else {
      console.log('Form is invalid');
    }
  }

  async updateItem() {

    let user = this.users?.find(u => {
      if (u.id == this.editForm.value.intermediary) {
        return true;
      }
      return false
    })

    this.editForm.value.user = user;
    let saved = await this.parseService.save(this.selectedObject, this.editForm.value);
    if (saved) {
      this.toastr.success("rate has been updated");
      document.getElementById("scancelButton")?.click();
      this.fetch();
      this.data = {};
    }
    this.parseService.submitting = false;
  }

  async deleteItem(mine: any) {
    let deleted = await this.parseService.delete(mine);
    if (deleted) {
      this.fetch();
    }
  }

  get rates(): FormArray {
    return this.myForm.get('rates') as FormArray;
  }
}
