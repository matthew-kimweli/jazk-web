import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParseService } from '../../../services/parse.service';

@Component({
  selector: 'app-policy-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-schedule.component.html',
  styleUrl: './policy-schedule.component.css'
})
export class PolicyScheduleComponent {
  autoMobile: any;
  motorClass: any = 'private';
  sale: any;
  today: string = '';

  
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
      
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

}
