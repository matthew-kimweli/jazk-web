import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NumberToWordsPipe } from '../../../pipes/numberToWords.pipe';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, NumberToWordsPipe],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css',
})
export class ReceiptComponent implements OnInit {
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

  numberToWords(num: any) {
    const ones = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
    const scales = ['', 'Thousand', 'Million', 'Billion'];

    // Helper function to convert numbers below 1000
    function convertHundreds(num: any) {
      let word = '';

      if (num > 99) {
        word += ones[Math.floor(num / 100)] + ' Hundred ';
        num %= 100;
      }
      if (num > 19) {
        word += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
      }
      if (num > 0) {
        word += ones[num] + ' ';
      }

      return word.trim();
    }

    if (num === 0) return 'Zero';

    let word = '';
    let scaleIndex = 0;

    while (num > 0) {
      let currentHundreds = num % 1000;

      if (currentHundreds > 0) {
        word =
          convertHundreds(currentHundreds) +
          (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') +
          ' ' +
          word;
      }

      num = Math.floor(num / 1000);
      scaleIndex++;
    }

    return word.trim();
  }

  // Helper function to convert decimal numbers
  numberToWordsWithDecimals(amount: any, currency: any) {
    const [integerPart, decimalPart] = amount.toString().split('.');
    let word = this.numberToWords(parseInt(integerPart));

    if (decimalPart) {
      word += ' and ' + this.numberToWords(parseInt(decimalPart)) + ' Cents';
    }
    let currtext = ' Kenya Shillings';
    return word + ` ${currtext} Only`;
  }
}
