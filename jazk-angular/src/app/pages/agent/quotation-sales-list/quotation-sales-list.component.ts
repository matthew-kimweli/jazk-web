import { Component, Input, input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as Parse from 'parse';
import { HeaderComponent } from "../../_components/header/header.component";
import { TextSlicePipe } from "../../../pipes/text-slice.pipe";
import { AuthService } from "../../../services/auth.service";
import { ParseService } from "../../../services/parse.service";
import { SideMenuComponent } from "../../_components/side-menu/side-menu.component";


@Component({
  selector: 'app-quotation-sales-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SideMenuComponent, TextSlicePipe],
  templateUrl: './quotation-sales-list.component.html',
  styleUrl: './quotation-sales-list.component.css'
})
export class QuotationSalesListComponent implements OnInit {
  insuranceType: any = '';
  sales: Parse.Object<Parse.Attributes>[] | undefined;
  quotations: Parse.Object<Parse.Attributes>[] | undefined;

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    public auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter["insurance"];
      
      if (id) {
        this.insuranceType = id
        this.fetchSales(id);
        this.fetchQuotations(id);
      }
    });
  }

  async fetchSales(id:any) {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkeSale");
    query.equalTo('insurance_type', id)
    query.equalTo('user_id', user.id)
    
    this.sales = await this.parseService.find(query);
    console.log('sales', this.sales)
  }

  async fetchQuotations(id:any) {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkeQuotation");
    query.equalTo('insurance_type', id)
    query.equalTo('user_id', user.id)
    
    this.quotations = await this.parseService.find(query);
    console.log('quotes', this.quotations)
  }

  gotoNewQuotation(){
    if(this.insuranceType == 'motor-private'){
      this.router.navigate(['/motor'])
    } else if(this.insuranceType == 'motor-commercial'){
      this.router.navigate(['/motor'])
    } else {
      this.router.navigate(['/welcome'])
    }
  }

  // async deleteItem(mine: any) {
  //   let deleted = await this.parseService.delete(mine);
  //   if (deleted) {
  //     // this.fetch();
  //   }
  // }

}
