import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../_components/header/header.component';
import { FormatTimePipePipe } from '../../pipes/format-time-pipe.pipe';
import * as Parse from 'parse';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SideMenuComponent } from '../_components/side-menu/side-menu.component';
import { ParseService } from '../../services/parse.service';
import * as quotationObj from '../../_helpers/premia.json';

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
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
  grossPremiumSold = 0;
  commissionEarned = 0;
  list: any;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    public dataService: DataService,
    public parseService: ParseService
  ) {}

  ngOnInit(): void {
    this.fetchSalesCount();
    this.fetchQuoteCount();

    this.fetchQuotations();
    this.fetchSales();
  }

  ngOnDestroy(): void {}

  async fetchQuoteCount() {
    try {
      this.quotationCount = this.dataService.recent.quotationCount;
      let query = new Parse.Query('JazkeQuotation');
      query.equalTo('user_id', this.auth.currentUserId);
      query.exists('client');
      this.quotationCount = await query.count();

      this.dataService.recent.quotationCount = this.quotationCount;
    } catch (error: any) {
      console.error(error);
      this.fetching = false;
    }
  }

  async fetchSalesCount() {
    try {
      this.salesCount = this.dataService.recent.salesCount;
      let query2 = new Parse.Query('JazkeSale');
      query2.equalTo('user_id', this.auth.currentUserId);
      this.salesCount = await query2.count();

      this.dataService.recent.salesCount = this.salesCount;
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
    this.sales = this.dataService.recent.sales;

    let user: any = this.auth.currentUser;

    let query = new Parse.Query('JazkeSale');
    query.equalTo('user_id', user.id);
    query.include(['quotation']);

    this.sales = await this.parseService.find(query);
    console.log('sales', this.sales);
    this.dataService.recent.sales = this.sales;

    // console.log('Normal Sales Obj => ', this.parseObjectToPlain(this.sales)[0])
    // console.log('Final Mapping => ', this.updateQuotation(this.parseObjectToPlain(this.sales)[0]));

    let sale: Parse.Object = this.sales[0];
    let data = sale.toJSON();
    console.log('Final Mapping => ', this.updateQuotation(data));
  }

  // Function to recursively convert Parse objects into plain JavaScript objects
  parseObjectToPlain(obj: any): any {
    if (obj instanceof Parse.Object) {
      const plainObject = { ...obj.attributes }; // Get object attributes

      // Recursively handle any nested Parse objects
      for (const key in plainObject) {
        if (plainObject[key] instanceof Parse.Object) {
          plainObject[key] = this.parseObjectToPlain(plainObject[key]);
        }
      }

      return plainObject;
    }

    // If it's a normal object or array, recursively handle those
    if (Array.isArray(obj)) {
      return obj.map((item) => this.parseObjectToPlain(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const plainObject: any = {};
      for (const key in obj) {
        plainObject[key] = this.parseObjectToPlain(obj[key]);
      }
      return plainObject;
    }

    return obj; // Return the value if it's a primitive
  }

  // Function to create a template with keys from the JSON and empty values
  createEmptyTemplate(originalObj: any): { [key: string]: any } {
    let template: { [key: string]: any } = {};

    for (let key in originalObj) {
      if (originalObj.hasOwnProperty(key)) {
        if (Array.isArray(originalObj[key])) {
          // Create an array of empty objects with the same structure for proposals
          template[key] = originalObj[key].map((item: any) =>
            this.createEmptyTemplate(item)
          );
        } else if (
          typeof originalObj[key] === 'object' &&
          originalObj[key] !== null
        ) {
          // Create an empty object with the same keys
          template[key] = this.createEmptyTemplate(originalObj[key]);
        } else {
          if (key == 'prc_code') {
            template[key] = originalObj[key];
          } else {
            template[key] = '';
          }
          
        }
      }
    }

    return template;
  }

  updateQuotation(newData: any) {
    // Create a deep copy of the imported quotationObj to allow mutations
    let updatedQuotationObj: any = this.createEmptyTemplate(quotationObj);
    // let updatedQuotationObj: any = {...quotationObj}

    // Update personal details
    updatedQuotationObj['quot_assr_name'] =
      newData.insurance_data.kyc.name || '';
    updatedQuotationObj['quot_assr_pin'] = newData.insurance_data.kyc.tin || '';
    updatedQuotationObj['quot_assr_phone'] =
      newData.insurance_data.kyc.phone || '';
    updatedQuotationObj['quot_assr_email'] =
      newData.insurance_data.kyc.email || '';

    // Access proposals array
    let proposals = updatedQuotationObj['proposals'];

    if (proposals && proposals.length > 0) {
      let proposal = proposals[0];
      let newQuoteData = newData.quotation.quoteData;

      // Safeguard to ensure proposal is valid
      if (proposal) {
        // Update proposal dates
        proposal['pol_fm_dt'] = newData.insurance_data.coverStartDate || '';
        proposal['pol_to_dt'] = newData.insurance_data.coverEndDate || '';

        // Update policy info
        proposal['pol_quot_no'] = newData.quotation.objectId || '';
        proposal['pol_dflt_si_curr_code'] = 'KES'; // Assuming currency remains the same
        proposal['pol_prem_curr_code'] = 'KES';

        // Access proposal sections and risks
        let proposalRisk =
          proposal['proposalsections']?.[0]?.['proposalrisks']?.[0];
        let vehicleData = newData.insurance_data.vehicle;

        if (proposalRisk && vehicleData) {
          // Update vehicle details
          proposalRisk['prai_flexi']['vehicle_make']['prai_code_04'] =
            newQuoteData.vehicleMake || '';
          proposalRisk['prai_flexi']['vehicle_model']['prai_code_05'] =
            newQuoteData.vehicleModel || '';
          proposalRisk['prai_flexi']['vehicle_reg_no']['prai_data_03'] =
            vehicleData.registrationNumber || '';
          proposalRisk['prai_flexi']['vehicle_chassis_no']['prai_data_01'] =
            vehicleData.chasisNumber || '';
          proposalRisk['prai_flexi']['vehicle_engine_no']['prai_data_02'] =
            vehicleData.EngineNumber || '';
          proposalRisk['prai_flexi']['vehicle_yom']['prai_num_01'] =
            newQuoteData.yearOfManufacture || 0;
          proposalRisk['prai_flexi']['vehicle_value']['prai_num_02'] =
            newQuoteData.sumInsured || 0;
          proposalRisk['prai_flexi']['vehicle_cc']['prai_num_04'] = 1800; // Assuming unchanged
          proposalRisk['prai_flexi']['num_pax']['prai_num_03'] =
            newQuoteData.passengerLegalLiabilityBenefit || 0;

          // Update cover details in proposal
          proposalRisk['proposalcovers']?.forEach((cover: any) => {
            switch (cover['prc_code']) {
              case '3101': // Own Damage
                cover['prc_prem_fc'] = newQuoteData.basicPremium || 0;
                cover.prc_desc = 'Own Damage'
                break;
              case '3176': // Third Party Only
                cover['prc_prem_fc'] = newQuoteData.pvtBenefit || 0;
                cover.prc_desc = 'Third Party Only'
                break;
              case '3109': // Windscreen
                cover['prc_prem_fc'] = newQuoteData.windScreenBenefit || 0;
                cover.prc_desc = 'Windscreen'
                break;
              case '3110': // Radio Cassette
                cover['prc_prem_fc'] = newQuoteData.radioCassetteBenefit || 0;
                cover.prc_desc = 'Radio Cassette'
                break;
              case '3198': // Excess Protector
                cover['prc_prem_fc'] = newQuoteData.excessProtectorBenefit || 0;
                cover.prc_desc = 'Excess Protector'
                break;
            }
          });

          // Update payment information
          proposal['pol_flexi']['payment_mode_desc'][
            'pol_flex_18'
          ] = `Flutterwave - ${newData.txRef || ''} - ${newData.amount || 0}`;
          proposal['pol_flexi']['payment_mode_code']['pol_flex_10'] = '4'; // Assuming unchanged
          proposal.pol_flexi.territory.pol_flex_02 = 'KENYA';
          proposal.pol_flexi.cover_type_code = 'Comprehensive';
          // if(newData.insurance_type == 'motor-commercial'){
          //   proposal.pol_flexi.cover_type_code = 'Commercial'
          // } else if(newData.insurance_type == 'motor-private'){
          //   proposal.pol_flexi.cover_type_code = 'Private'
          // }
        }
      }
    }

    delete updatedQuotationObj.default;

    // Return updated object
    return updatedQuotationObj;
  }

  async fetchQuotations() {
    this.quotations = this.dataService.recent.quotations;

    let user: any = this.auth.currentUser;

    let query = new Parse.Query('JazkeQuotation');
    query.equalTo('user_id', user.id);
    query.exists('client');

    this.quotations = await this.parseService.find(query);
    console.log('quotes', this.quotations);
    this.dataService.recent.quotations = this.quotations;
  }
}
