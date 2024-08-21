import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MotorService } from '../../../services/motor.service';
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-quote-subdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-quote-subdetails.component.html',
  styleUrl: './view-quote-subdetails.component.css'
})
export class ViewQuoteSubdetailsComponent {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public parseService: ParseService,
    public motorService: MotorService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];

      if (id) {
        this.fetchQuotation(id);
      }
    });
  }

  async fetchQuotation(id: any) {
    try {
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeQuotation');
      let quote = await query.get(id);
      console.log('quote', quote);
      if(quote){
        this.motorService.motorQuotation = quote.get('quoteData')
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }
}
