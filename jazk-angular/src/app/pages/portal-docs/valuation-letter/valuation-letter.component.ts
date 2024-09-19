import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valuation-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valuation-letter.component.html',
  styleUrl: './valuation-letter.component.css'
})
export class ValuationLetterComponent implements OnInit {
  today: string = '';
  sale: any;
  valuer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public parseService: ParseService,
  ) {
    this.getToday();
  }

  getToday() {
    var date = new Date(); // create a new date object
    var formattedDate = date.toISOString().substring(0, 10); // format the date as yyyy-mm-dd and remove the time and timezone
    console.log(formattedDate); // output the formatted date
    this.today = formattedDate;
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
      console.log('fetching sale', id)
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeSale');
      let sale = await query.get(id);
      console.log('sale', sale);
      this.sale = sale;
      if(sale){
        this.valuer = sale.get('insurance_data').vehicle.valuer
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }


  get isRegent(){
    return this.valuer == 'REGENT VALUERS'
  }
  get isAUTOMOBILEASSOCIATION(){
    return this.valuer == 'AUTOMOBILE ASSOCIATION of KENYA'
  }
  get isSOLVITLIMITED(){
    return this.valuer == 'SOLVIT LIMITED'
  }
  get isCAPITALALLIANCEVALUERS(){
    return this.valuer == 'CAPITAL ALLIANCE VALUERS AND ASSESSORS'
  }
  get isLINKSVALUERS(){
    return this.valuer == 'LINKS VALUERS AND ASSESSORS'
  }
}
