import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';

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

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [this.data.name, Validators.required],
      coverType: [this.data.coverType, [Validators.required, Validators.email]],
      intermediary: [this.data.intermediary, Validators.required],
      rate: [this.data.rate, Validators.required],
     
    });

    this.fetch();
    this.fetchUsers()

    this.editForm = this.fb.group({
      name: [this.editData.name, Validators.required],
      coverType: [this.editData.coverType, [Validators.required, Validators.email]],
      intermediary: [this.editData.intermediary, Validators.required],
      rate: [this.editData.rate, Validators.required],
    });
  }

  async fetch() {
    let query = new Parse.Query("JazkeRate");
    this.list = await this.parseService.find(query);
    console.log('list', this.list)
  }

  async fetchUsers() {
    let query = new Parse.Query(Parse.User);
    this.users = await this.parseService.find(query);
    console.log('list', this.list)
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
