import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../_components/header/header.component";
import * as Parse from 'parse';

@Component({
  selector: 'app-view-sale-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './view-sale-details.component.html',
  styleUrl: './view-sale-details.component.css'
})
export class ViewSaleDetailsComponent {
  sale: any;
  data: any;


  
  constructor(
    private activatedRoute: ActivatedRoute,
    public parseService: ParseService
  ) {
    
  }

  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];

      if (id) {
        this.fetchSale(id);
      }
    });
  }

  async fetchSale(id: any) {
    try {
      console.log('fetching sale', id);
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeSale');
      query.include(['quotation'])
      let sale = await query.get(id);
      console.log('sale', sale);
      this.sale = sale;
      if (sale) {
        this.data = sale.toJSON()
        console.log('data', this.data)
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }
}
