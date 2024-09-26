import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../../_components/header/header.component';
import { SideMenuComponent } from '../../../_components/side-menu/side-menu.component';
import { ParseService } from '../../../../services/parse.service';
import { AuthService } from '../../../../services/auth.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, SideMenuComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  list: Parse.Object<Parse.Attributes>[] | undefined;
  selectUserId: any;
  selectedUser: any;

  userForm!: FormGroup;
  edituserForm!: FormGroup;

  userData = {
    name: "",
    userEmail: "",
    phone: "",
    position: "",
    password: "",
    userType: "agent",
  };
  userDb: any;
  managers: Parse.Object<Parse.Attributes>[] | undefined;
  selectedManager: Parse.Object<Parse.Attributes> | undefined;
  departments: Parse.Object<Parse.Attributes>[] | undefined;
  editUserData: any = {};
  selectedUserToEdit: any;

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [this.userData.name, Validators.required],
      userEmail: [this.userData.userEmail, [Validators.required, Validators.email]],
      userType: [this.userData.userType, Validators.required],
      password: [this.userData.password, Validators.required],
      position: [this.userData.position, Validators.required],
    });

    this.edituserForm = this.fb.group({
      name: [this.editUserData.name, Validators.required],
      userEmail: [this.editUserData.userEmail, [Validators.required, Validators.email]],
      userType: [this.editUserData.userType, Validators.required],
      password: [this.editUserData.password],
      position: [this.editUserData.position, Validators.required],
    });

    this.fetch();
    this.fetchManagers();
    this.fetchDepartments();
  }

  async setUserToEdit(item: any, index:any) {
    this.editUserData.name = item.get("name");
    this.editUserData.userEmail = item.get("userEmail");
    this.editUserData.userType = item.get("userType");
    this.editUserData.password = item.get("password");
    this.editUserData.position = item.get("position");
    

    this.selectedUserToEdit = this.list?.at(index);
  }

  async updateUser() {
    this.parseService.submitting = true;
    if (this.edituserForm.valid) {
      console.log("Form submitted:", this.edituserForm.value);
      
    this.selectedUserToEdit.set('email', this.edituserForm.value.userEmail)
    let saved = await this.parseService.save(this.selectedUserToEdit, this.edituserForm.value);
    if (saved) {
      this.toastr.success("User has been updated");
      document.getElementById("EditUserCancelButton")?.click();
      this.fetch();
      this.editUserData = {};
    }
    this.parseService.submitting = false;
    } else {
      console.log("Form is invalid. Please fix errors.", this.edituserForm.value);
    }

  }

  async createUser() {
    let user = new Parse.User();
    user.set("name", this.userData.name);
    user.set("email", this.userData.userEmail);
    user.set("userEmail", this.userData.userEmail);
    user.set("username", this.userData.userEmail);
    user.set("position", this.userData.position);
    user.set("password", this.userData.password);
    user.set("userType", this.userData.userType);
    

    const acl = user.getACL() || new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setRoleReadAccess("Admin", true);
    acl.setRoleWriteAccess("Admin", true);
    user.setACL(acl);

    try {
      console.log("Saving user...");
      let saved = await this.parseService.save(user);
      if (saved) {
        this.toastr.success("User has been Saved");
        document.getElementById("NewUserCancelButton")?.click();
        this.fetch();
        this.userData = {
          name: "",
          userEmail: "",
          phone: "",
          position: "",
          password: "",
          userType: "finance",
          
        };
      }
      console.log("User saved");
    } catch (error) {
      console.error(error);
    }
  }

  async fetch() {
    let query = new Parse.Query(Parse.User);
    query.exists("position");
    this.list = await this.parseService.find(query);
  }

  async fetchManagers() {
    let query2 = new Parse.Query(Parse.User);
    query2.equalTo("userType", "manager");
    this.managers = await this.parseService.find(query2);
    console.log("managers", this.managers);
  }

  async fetchDepartments() {
    let query = new Parse.Query("JazzLPODepartment");
    this.departments = await this.parseService.find(query);
  }

  async selectUser(user: Parse.Object<Parse.Attributes>) {
    this.selectedUser = user;
    this.fetchManagers();
  }

  async onSelectManager(event: any) {
    let value = event.target.value;
    let manager = this.managers?.find((u) => {
      if (u.id == value) {
        return true;
      }
      return false;
    });

    this.selectedManager = manager;
    console.log("manager", manager);
  }

  async saveManager() {
    let manager = this.selectedManager;
    if (manager) {
      this.selectedUser.set("manager", manager.toPointer());
      this.selectedUser.set("managerId", manager.id);
      this.selectedUser.set("managerName", manager.get("name"));
      this.selectedUser.set("managerPosition", manager.get("position"));

      try {
        this.toastr.info("Saving manager");
        let saved = await this.parseService.save(this.selectedUser);
        if (saved) {
          this.toastr.success("Saved");
          document.getElementById("AssignManagerCancelButton")?.click();
          this.fetch();
        } else {
          this.toastr.info("Unable to save");
        }
      } catch (error) {
        console.error(error);
        this.toastr.error("Unable to save manager");
      }
    }
  }

  submitForm() {
    this.parseService.submitting = true;
    if (this.userForm.valid) {
      console.log("Form submitted:", this.userForm.value);
      this.createUser();
    } else {
      console.log("Form is invalid. Please fix errors.", this.userForm.value);
    }
  }

  async deleteItem(mine: any) {
    let deleted = await this.parseService.delete(mine);
    if (deleted) {
      this.fetch();
    }
  }

  get potentialManagers() {
    if (!this.selectedUser) {
      return this.managers;
    }
    return this.managers?.filter((m) => {
      if (m.id == this.selectedUser.id) {
        return false;
      }
      return true;
    });
  }
}
