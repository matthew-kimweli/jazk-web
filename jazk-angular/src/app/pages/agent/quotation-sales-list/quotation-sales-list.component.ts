import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
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
export class QuotationSalesListComponent {
  list: Parse.Object<Parse.Attributes>[] | undefined;
  isMine: any = false;

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    public auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter["id"];
      if (id) {
        this.fetchSale(id);
        this.fetchQuotation(id);
      }
    });
  }

  async fetchSale(id:any) {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkeSale");
    query.equalTo('insurance_type', id)
    query.equalTo('user_id', user.id)
    
    this.list = await this.parseService.find(query);
  }

  async fetchQuotation(id:any) {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkeQuotations");
    query.equalTo('insurance_type', id)
    query.equalTo('user_id', user.id)
    
    this.list = await this.parseService.find(query);
  }

  // async deleteItem(mine: any) {
  //   let deleted = await this.parseService.delete(mine);
  //   if (deleted) {
  //     this.fetch();
  //   }
  // }

}
