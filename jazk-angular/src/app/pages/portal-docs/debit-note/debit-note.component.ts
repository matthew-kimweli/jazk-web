import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NumberToWordsPipe } from '../../../pipes/numberToWords.pipe';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-debit-note',
  standalone: true,
  imports: [CommonModule, NumberToWordsPipe],
  templateUrl: './debit-note.component.html',
  styleUrl: './debit-note.component.css'
})
export class DebitNoteComponent {
  data: any;
  pdf_date: Date = new Date();

  today: string = '';
  sale: any;
  valuer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public parseService: ParseService
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
      console.log('fetching sale', id);
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeSale');
      query.include(['quotation'])
      let sale = await query.get(id);
      console.log('sale', sale);
      this.sale = sale;
      if (sale) {
        this.valuer = sale.get('insurance_data').vehicle.valuer;
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

}
