import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../_components/header/header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuComponent } from '../_components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { ParseService } from '../../services/parse.service';
import { ToastrService } from 'ngx-toastr';
import * as Parse from 'parse';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    SideMenuComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent {
  fetching: any;

  reportForm!: FormGroup;

  categories: any[] = ['Equity Bank', 'Sales'];
  users: Parse.Object<Parse.Attributes>[] | undefined;
  list: Parse.Object<Parse.Attributes>[] | undefined;
  data: any = { createdBy: '' };
  customRate: any;

  coverTypes: any[] = [
    'Motor Private',
    'Motor Commercial',
    'Motor Cycle',
    'Home',
    'Personal Accident',
    'SME',
    'WIBA',
    'Marine',
  ];


  constructor(
    public parseService: ParseService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      coverType: [''],
      startDate: [''],
      endDate: [''],
      category: [''],
      createdBy: [''],
    });
    // this.fetchUsers();
  }

  async fetch() {
    // console.log(this.reportForm.value);

    // let filter = this.reportForm.value;

    // let className = 'JazkeQuotation';
    // if (filter.category == 'Equity Bank') {
    //   className = 'JazkeQuotation';
    // } else {
    //   className = 'JazkeSale';
    // }

    // let query = new Parse.Query(className);

    // if (filter.createdBy) {
    //   query.equalTo('createdBy', filter.createdBy);
    // }

    // if (filter.coverType) {
    //   query.equalTo('insurance_type', filter.coverType);
    // }

    // this.list = await this.parseService.find(query);
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.fetch();
    } else {
      console.log('Form is invalid');
    }
  }

}
