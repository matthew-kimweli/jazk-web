import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SideMenuComponent,
  ],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css'
})
export class BanksComponent {


  fetching: any;
  list: Parse.Object<Parse.Attributes>[] | undefined;

  myForm!: FormGroup;
  editForm!: FormGroup;
  data: any = { name: "", email: "",  };
  editData: any = {id:"", name: "", email:"" };
  selectedObject: any;
  saving: any;
  db: any;

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
    });

    this.fetch();

    this.editForm = this.fb.group({
      name: [this.editData.name, Validators.required],
      email: [this.editData.email, [Validators.required, Validators.email]],
     
    });
  }

  async fetch() {
    let query = new Parse.Query("JazkeBank");
    this.list = await this.parseService.find(query);
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
      let DB = Parse.Object.extend("JazkeBank");
      e = new DB();
    }

    let saved = await this.parseService.save(e, this.data);
    if (saved) {
      this.toastr.success("Bank has been submitted");
      document.getElementById("cancelButton")?.click();
      this.fetch();
      this.data = {};
    }
    this.parseService.submitting = false;
  }

  async setItemToEdit(item: any, index:any) {
    this.editData.name = item.get('name')
    this.editData.email = item.get("email")
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
      this.toastr.success("Bank has been updated");
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
