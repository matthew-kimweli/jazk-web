import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from 'ngx-editor';
import { HeaderComponent } from '../../_components/header/header.component';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';
import { ParseService } from '../../../services/parse.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    SideMenuComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css',
})
export class GenerateReportComponent implements OnInit {
  fetching: any;

  reportForm!: FormGroup;
  list: Parse.Object<Parse.Attributes>[] | undefined;
  categories: any[] = ['Quotations', 'Sales'];
  users: Parse.Object<Parse.Attributes>[] | undefined;
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
  data: any = { createdBy: '' };

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
    this.fetchUsers();
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.fetch();
    } else {
      console.log('Form is invalid');
    }
  }

  async fetch() {
    console.log(this.reportForm.value);

    let filter = this.reportForm.value;

    let className = 'JazkeQuotation';
    if (filter.category == 'Quotations') {
      className = 'JazkeQuotation';
    } else {
      className = 'JazkeSale';
    }

    let query = new Parse.Query(className);

    if (filter.createdBy) {
      query.equalTo('createdBy', filter.createdBy);
    }

    if (filter.coverType) {
      query.equalTo('insurance_type', filter.coverType);
    }

    this.list = await this.parseService.find(query);
  }

  async fetchUsers(departmentId?: any) {
    let query = new Parse.Query(Parse.User);
    query.exists('position');
    if (departmentId) {
      query.equalTo('departmentId', departmentId);
    }
    this.users = await this.parseService.find(query);
  }
}
