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
import { ParseService } from "../../services/parse.service";

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
  today: string | number | Date = new Date();
  saving: any = false;
  deleting: any = false;
  sales: any;
  quotations: any;
  quotationCount: number = 0;
  salesCount: number = 0;
  grossPremiumSold = 0
  commissionEarned = 0
  list: any;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    public dataService: DataService,
    public parseService: ParseService,
  ) {}

  ngOnInit(): void {
    this.fetchStats()

    this.fetchQuotations()
    this.fetchSales()
  }

  ngOnDestroy(): void {}


  async fetchStats() {
    try {
      
      let query = new Parse.Query("JazkeQuotation");
      query.equalTo("user_id", this.auth.currentUserId);
      this.quotationCount = await query.count();

      let query2 = new Parse.Query("JazkeSale");
      // query.equalTo("status", 'Completed');
      query.equalTo("user_id", this.auth.currentUserId);
      this.salesCount = await query2.count();


      
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

  async fetchSales() {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkeSale");
    query.equalTo('user_id', user.id)
    
    this.sales = await this.parseService.find(query);
    console.log('sales', this.sales)
  }

  async fetchQuotations() {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkeQuotation");
    query.equalTo('user_id', user.id)
    
    this.quotations = await this.parseService.find(query);
    console.log('quotes', this.quotations)
  }

}
