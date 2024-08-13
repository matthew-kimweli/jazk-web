import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../_components/header/header.component";
import { FormatTimePipePipe } from "../../pipes/format-time-pipe.pipe";
import * as Parse from "parse";
import { AuthService } from "../../services/auth.service";
import { DataService } from "../../services/data.service";
import { ToastrService } from "ngx-toastr";
import { SideMenuComponent } from "../_components/side-menu/side-menu.component";

@Component({
  selector: "app-home",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    FormatTimePipePipe,
    SideMenuComponent,
  ],
})
export class HomeComponent {
  form: FormGroup | any;
  fetching: boolean = false;
  count: number = 0;
  list: any = [];
  today: string | number | Date = new Date();
  saving: any = false;
  deleting: any = false;
  supplierCount: any = 0;
  totalOrderCount: any = 0;
  totalApproved = 0
  totalRejected = 0
  totalInProcess: number = 0;
totalSuppliers: number = 0;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchList();
    this.fetchStats()
  }

  ngOnDestroy(): void {}

  async fetchList() {
    try {
      this.fetching = true;
      let query = new Parse.Query("JazzLPO");
      query.equalTo("userId", this.auth.currentUserId);
      this.count = await query.count();

      this.fetching = false;
    } catch (error: any) {
      console.error(error);
      this.fetching = false;
    }
  }

  async fetchStats() {
    try {
      
      let query = new Parse.Query("JazzLPO");
      // query.equalTo("userId", this.auth.currentUserId);
      this.totalOrderCount = await query.count();

      let query2 = new Parse.Query("JazzLPO");
      query.equalTo("status", 'Completed');
      this.totalApproved = await query2.count();

      // let query3 = new Parse.Query("JazzLPO");
      // query.equalTo("status", 'Rejected');
      // this.totalRejected = await query3.count();

      let query3 = new Parse.Query("JazzLPOSupplier");
      // query.equalTo("status", 'Rejected');
      this.totalSuppliers = await query3.count();

      let query4 = new Parse.Query("JazzLPO");
      // query4.notEqualTo("status", 'Approved');
      // query4.notEqualTo("status", 'Rejected');
      query4.equalTo("status", 'Pending');
      this.totalInProcess = await query4.count();

      
    } catch (error: any) {
      console.error(error);
      this.fetching = false;
    }
  }

  receiveNoteFromSearch(note: Parse.Object) {
    let index = this.list.findIndex((n: any) => {
      if (n.id == note.id) {
        return true;
      }
      return false;
    });
    if (index != -1) {
    }
  }
}
