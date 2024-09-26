import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../_components/header/header.component';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';
import * as Parse from 'parse';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SideMenuComponent,
  ],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css',
})
export class BanksComponent {
  fetching: any;
  list: Parse.Object<Parse.Attributes>[] | undefined;

  myForm!: FormGroup;
  editForm!: FormGroup;
  data: any = { name: '', email: '' };
  editData: any = { id: '', name: '', email: '' };
  selectedObject: any;
  saving: any;
  db: any;

  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
    });

    this.fetch();

    this.editForm = this.fb.group({
      name: [this.editData.name, Validators.required],
      email: [this.editData.email, [Validators.required, Validators.email]],
    });

    // this.addBanks()
  }

  async addBanks() {
    let banks_mfis = [
      {
        name: 'Absa Bank of Kenya Limited',
        email: 'absa.kenya@absa.africa.com',
      },
      {
        name: 'Access Bank (Kenya) PLC',
        email: 'infokenya@accessbankplc.com',
      },
      {
        name: 'African Banking Corporation Limited',
        email: 'talk2us@abcthebank.com, headoffice@abcthebank.com',
      },
      {
        name: 'Bank of Africa Kenya Limited',
        email: 'headoffice@boakenya.com',
      },
      {
        name: 'Bank of Baroda (K) Limited',
        email: 'ho.kenya@bankofbaroda.com, Kenya@bankofbaroda.com',
      },
      {
        name: 'Bank of India',
        email: 'cekenya@boikenya.com',
      },
      {
        name: 'Citibank N.A Kenya',
        email: 'Kenya.citiservice@citi.com',
      },
      {
        name: 'Consolidated Bank of Kenya Limited',
        email: 'headoffice@consolidated-bank.com',
      },
      {
        name: 'Co-operative Bank of Kenya Limited',
        email: 'customerservice@co-opbank.co.ke',
      },
      {
        name: 'Credit Bank Limited',
        email: 'customerservice@creditbank.co.ke',
      },
      {
        name: 'Development Bank of Kenya Limited',
        email: 'dbk@devbank.com',
      },
      {
        name: 'Diamond Trust Bank Kenya Limited',
        email: 'info@dtbafrica.com',
      },
      {
        name: 'DIB Bank Kenya Limited',
        email: 'contactus@dibkenya.co.ke',
      },
      {
        name: 'Ecobank Kenya Limited',
        email: 'info@ecobank.com',
      },
      {
        name: 'Equity Bank Kenya Limited',
        email: 'info@equitybank.co.ke',
      },
      {
        name: 'Family Bank Limited',
        email: 'customerservice@familybank.co.ke, info@familybank.co.ke',
      },
      {
        name: 'First Community Bank Limited',
        email: 'info@fcb.co.ke',
      },
      {
        name: 'Guaranty Trust Bank (K) Ltd',
        email: 'banking@gtbank.com',
      },
      {
        name: 'Guardian Bank Limited',
        email: 'biashara@guardian-bank.com, headoffice@guardian-bank.com',
      },
      {
        name: 'Gulf African Bank Limited',
        email: 'info@gulfafricanbank.com',
      },
      {
        name: 'Habib Bank A.G Zurich',
        email: 'habibbank@wananchi.com',
      },
      {
        name: 'Habib Bank Limited',
        email: 'habibbank@wananchi.com',
      },
      {
        name: 'I & M Bank Limited',
        email: 'invest@imbank.co.ke',
      },
      {
        name: 'Jamii Bora Bank Limited',
        email: 'info@jamiiborabank.co.ke',
      },
      {
        name: 'KCB Bank Kenya Limited',
        email: 'kcbhq@kcb.co.ke',
      },
      {
        name: 'Kingdom Bank Limited',
        email: 'info@kingdombankltd.co.ke',
      },
      {
        name: 'Mayfair CIB Bank Limited',
        email: 'info@mayfair-bank.com',
      },
      {
        name: 'Middle East Bank (K) Limited',
        email: 'Kingdom Bank Limited',
      },
      {
        name: 'M-Oriental Bank Limited',
        email: 'headoffice@moriental.co.ke',
      },
      {
        name: 'National Bank of Kenya Limited',
        email: 'info@nationalbank.co.ke',
      },
      {
        name: 'NCBA Bank Kenya PLC',
        email: 'contactcentre@ncbagroup.com',
      },
      {
        name: 'Paramount Bank Limited',
        email: 'info@paramountbank.co.ke',
      },
      {
        name: 'Prime Bank Limited',
        email: 'headoffice@primebank.co.ke',
      },
      {
        name: 'SBM Bank Kenya Limited',
        email: 'customerservice@smbank.co.ke',
      },
      {
        name: 'Sidian Bank Limited',
        email: 'enquiries@sidianbank.co.ke',
      },
      {
        name: 'Spire Bank Ltd',
        email: 'letstalk@spirebank.co.ke',
      },
      {
        name: 'Stanbic Bank Kenya Limited',
        email: 'customercare@stanbic.com',
      },
      {
        name: 'Standard Chartered Bank Kenya Limited',
        email: 'Talk-Us@sc.com',
      },
      {
        name: 'Trans-National Bank Limited',
        email: 'customerservice@tnbl.co.ke',
      },
      {
        name: 'UBA Kenya Bank Limited',
        email: 'ubakenya@ubagroup.com',
      },
      {
        name: 'Victoria Commercial Bank Limited',
        email: 'victoria@vicbank.com',
      },

      // microfinances
      {
        name: 'Branch Microfinance Bank Limited',
        email: '',
      },
      {
        name: 'Caritas Microfinance Bank Limited',
        email: 'info@caritas-mfb.co.ke',
      },
      {
        name: 'Century Microfinance Bank Limited',
        email: 'info@century.co.ke',
      },
      {
        name: 'Choice Microfinance Bank Limited',
        email: 'daraja@darajabank.co.ke',
      },
      {
        name: 'Daraja Microfinance Bank Limited',
        email: 'daraja@darajabank.co.ke',
      },
      {
        name: 'Faulu Microfinance Bank Limited',
        email:
          'info@faulukenya.com, customercare@faulukenya.com, contact@faulukenya.com',
      },
      {
        name: 'Kenya Women Microfinance Bank PLC',
        email: 'info@kwftbank.com',
      },
      {
        name: 'LOLC Kenya Microfinance Bank PLC',
        email: '',
      },
      {
        name: 'Maisha Microfinance Bank Ltd',
        email: 'info@maishabank.com',
      },
      {
        name: 'Muungano Microfinance Bank PLC',
        email: 'info@muunganomfbank.co.ke',
      },
      {
        name: 'Rafiki Microfinance Bank Limited',
        email: 'info@rafiki.co.ke',
      },
      {
        name: 'Salaam Microfinance Bank Limited',
        email: '',
      },
      {
        name: 'SMEP Microfinance Bank PLC',
        email: 'info@smep.co.ke',
      },
      {
        name: 'Sumac Microfinance Bank Limited',
        email: 'info@sumacmicrofinancebank.co.ke',
      },
      {
        name: 'U & I Microfinance Bank Limited',
        email: 'info@uni-microfinance.co.ke',
      },
      {
        name: 'Uwezo Microfinance Bank Limited',
        email: 'info@uwezomfbank.com',
      },
    ];

    for (const b of banks_mfis) {
      let Bank = Parse.Object.extend('JazkeBank');
      let bank = new Bank();
      console.log('saving...');
      await bank.save(b);
      console.log('saved', b);
    }
  }

  async fetch() {
    let query = new Parse.Query('JazkeBank');
    this.list = await this.parseService.find(query);
    console.log('list', this.list);
  }

  submitForm() {
    this.parseService.submitting = true;
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
      this.save();
    } else {
      console.log('Form is invalid. Please fix errors.', this.myForm.value);
    }
  }

  async save() {
    let e;

    if (this.db) {
      e = this.db;
    } else {
      let DB = Parse.Object.extend('JazkeBank');
      e = new DB();
    }

    let saved = await this.parseService.save(e, this.data);
    if (saved) {
      this.toastr.success('Bank has been submitted');
      document.getElementById('cancelButton')?.click();
      this.fetch();
      this.data = {};
    }
    this.parseService.submitting = false;
  }

  async setItemToEdit(item: any, index: any) {
    this.editData.name = item.get('name');
    this.editData.email = item.get('email');
    this.selectedObject = this.list?.at(index);
  }

  submitEdits() {
    this.parseService.submitting = true;
    if (this.editForm.valid) {
      console.log('Editted Form submitted', this.editForm.value);
      this.updateItem();
    } else {
      console.log('Form is invalid');
    }
  }

  async updateItem() {
    let saved = await this.parseService.save(
      this.selectedObject,
      this.editForm.value
    );
    if (saved) {
      this.toastr.success('Bank has been updated');
      document.getElementById('scancelButton')?.click();
      this.fetch();
      this.data = {};
    }
    this.parseService.submitting = false;
  }

  async deleteItem(mine: any) {
    let deleted = await this.parseService.delete(mine);
    if (deleted) {
      this.fetch();
    }
  }
}
