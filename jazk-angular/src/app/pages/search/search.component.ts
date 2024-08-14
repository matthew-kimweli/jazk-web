import { Component } from "@angular/core";
import { SideMenuComponent } from "../_components/side-menu/side-menu.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../_components/header/header.component";
import { ParseService } from "../../services/parse.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import * as Parse from 'parse';
import { TextSlicePipe } from "../../pipes/text-slice.pipe";

@Component({
    selector: "app-search",
    standalone: true,
    templateUrl: "./search.component.html",
    styleUrl: "./search.component.css",
    imports: [CommonModule, RouterModule, HeaderComponent, SideMenuComponent, TextSlicePipe]
})
export class SearchComponent {
  list: Parse.Object<Parse.Attributes>[] | undefined;
  isMine: any = false;

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazkePolicy");
    
    this.list = await this.parseService.find(query);
  }

  async deleteItem(mine: any) {
    let deleted = await this.parseService.delete(mine);
    if (deleted) {
      this.fetch();
    }
  }

}
