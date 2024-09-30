import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';
import * as Parse from 'parse';
import { IMaskModule } from 'angular-imask';
import vehicleData from '../../../_helpers/vehicleMake.json';

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

  fetching: any;
  list: Parse.Object<Parse.Attributes>[] | undefined;

  myForm!: FormGroup;
  editForm!: FormGroup;
  data: any = { name: "", email: "", phone: "", address: "", city: "", country: "", tin: "", premiaCode: "" };
  editData: any = {id:"", name: "", email: "", phone: "", address: "", city: "", country: "", tin: "", premiaCode: ""  };
  selectedObject: any;
  saving: any;
  db: any;
  
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
  users: Parse.Object<Parse.Attributes>[] | undefined;

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

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      name: [this.data.name, Validators.required],
      coverType: [this.data.coverType, [Validators.required]],
      intermediary: [this.data.intermediary, Validators.required],
      rate: [this.data.rate, Validators.required],
      makeInterest: [this.data.makeInterest, Validators.required],
      vehicleMake: [this.data.vehicleMake, Validators.required],
      vehicleMakes: this.fb.array(
        (this.data.vehicleMakes || []).map((d: any) =>
          this.fb.group({
            vehicleMake: [this.data.vehicleMake, Validators.required],
          })
        )
      ),
      maxVehicleAge: [this.data.maxVehicleAge, Validators.required],
      maxVehicleValue: [this.data.maxVehicleValue, Validators.required],
     
    });

    this.control = new FormControl<number>(this.data.maxVehicleValue);

    this.fetch();
    this.fetchUsers()

    this.editForm = this.fb.group({
      name: [this.editData.name, Validators.required],
      coverType: [this.editData.coverType, [Validators.required]],
      intermediary: [this.editData.intermediary, Validators.required],
      rate: [this.editData.rate, Validators.required],
      makeInterest: [this.editData.makeInterest, Validators.required],
      vehicleMake: [this.editData.vehicleMake, Validators.required],
      maxVehicleAge: [this.editData.maxVehicleAge, Validators.required],
      maxVehicleValue: [this.editData.maxVehicleValue, Validators.required],

    });
  }

  selectVehicleMake() {
    this.allVehicleMakes = false
  }

  // addVehicleMake() {
  //   const fg = this.fb.group({
  //     vehicleMake: [""]
  //   });
  //   this.data.vehicleMakes.push(fg);
  // }

  // removeVehicleMake(i: any) {
  //   this.data.vehicleMakes.removeAt(i);
  // }

  async fetch() {
    let query = new Parse.Query("JazkeRate");
    this.list = await this.parseService.find(query);
    console.log('list', this.list)
  }

  async fetchUsers() {
    let query = new Parse.Query(Parse.User);
    this.users = await this.parseService.find(query);
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

    let user = this.users?.find(u=>{
      if(u.id == this.data.intermediary){
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

  async setItemToEdit(item: any, index:any) {
    this.editData.name = item.get('name')
    this.editData.coverType = item.get("coverType")
    this.editData.intermediary = item.get("intermediary")
    this.editData.rate = item.get("rate")
    this.editData.makeInterest = item.get("makeInterest")
    this.editData.maxVehicleAge = item.get("maxVehicleAge")
    this.editData.maxVehicleValue = item.get("maxVehicleValue")
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
    
    let user = this.users?.find(u=>{
      if(u.id == this.editForm.value.intermediary){
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
}
