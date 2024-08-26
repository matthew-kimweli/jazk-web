import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize-html.pipe';
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, SanitizeHtmlPipe],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {
  list: any[] = [];
  

  constructor(
    public auth: AuthService,
    public dataService: DataService,
    public parseService: ParseService,
  ) {
    
  }

  ngOnInit() {
    let list = [
      {
        name: 'Dashboard',
        route: '/home',
        roles:['admin','normal', 'finance', 'manager', 'ceo'],
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M5 12l-2 0l9 -9l9 9l-2 0" /> <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /> <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /> </svg>'
      },
      // {
      //   name: 'Search',
      //   route: '/search',
      //   roles:['admin','normal', 'finance', 'manager', 'ceo'],
      //   icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /> <path d="M18.5 18.5l2.5 2.5" /> <path d="M4 6h16" /> <path d="M4 12h4" /> <path d="M4 18h4" /> </svg>'
      // },
      {
        name: 'Motor Private',
        route: `/list/motor-private`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'Motor Commercial',
        route: `/list/motor-commercial`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'Home Insurance',
        route: `/list/home-insurance`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'Personal Accident',
        route: `/list/personal-accident`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'SME',
        route: `/list/SME`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'WIBA',
        route: `/list/WIBA`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'Marine',
        route: `/list/marine`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-minecraft"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008c.62 .354 1.38 .354 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /><path d="M12 17l3.003 -1.668m3 -1.667l2.997 -1.665m-9 5l-9 -5" /><path d="M15 17l3 -1.67v-3l-3 1.67z" /></svg>'
      },
      {
        name: 'Reports',
        route: `/reports`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-list-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" /></svg>'
      },
      // {
      //   name: 'All Sales',
      //   route: `/welcome`,
      //   roles:['admin', 'normal', 'finance', 'manager'],
      //   icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-list-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" /></svg>'
      // },
      {
        name: 'New Quotation',
        route: `/welcome`,
        roles:['admin', 'normal', 'finance', 'manager'],
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M12 5l0 14" /> <path d="M5 12l14 0" /> </svg>'
      },
      // {
      //   id:'inbox',
      //   name: 'Inbox',
      //   route: '/inbox',
      //   count: 0,
      //   roles:['admin','normal', 'finance', 'manager', 'ceo'],
      //   icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-grid-goldenratio"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10h18" /><path d="M3 14h18" /><path d="M10 3v18" /><path d="M14 3v18" /></svg>'
      // },
      
      // {
      //   name: 'Reports',
      //   route: '/reports',
      //   roles:['admin', 'normal', 'finance', 'manager', 'ceo'],
      //   icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-report"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" /><path d="M18 14v4h4" /><path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" /><path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M8 11h4" /><path d="M8 15h3" /></svg>'
      // },
      // {
      //   name: 'System Administration',
      //   route: '/settings',
      //   roles:['admin', 'normal', 'finance', 'manager'],
      //   icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-settings-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>'
      // },
    ]

    let user = this.auth.currentUser;
    let role = user?.get('userType') ?? ''
    console.log('role', role)
    this.list = []
    for (const p of list) {
      // if(p.roles.includes(role)){
        
      // }
      this.list.push(p)
    }

    this.fetchInbox()
  }

  async fetchInbox() {

    let inboxCount = this.parseService.inboxCount 

    let index = this.list.findIndex(r=>{
      if(r.id == 'inbox'){
        return true
      }
      return false
    })

    if(index != -1){
      this.list[index].count = inboxCount
    }


    let user: any = this.auth.currentUser;

    let query = new Parse.Query("JazzLPO");
    // query.notEqualTo('status', 'Approved')
    if (this.auth.isFinance) {
      query.equalTo("forwardedTo", "finance");
    } else if (this.auth.isCEO) {
      query.equalTo("forwardedTo", "ceo");
    } else {
      query.equalTo("forwardedTo", user.id);
    }

    inboxCount = await query.count();
    this.parseService.inboxCount = inboxCount

    index = this.list.findIndex(r=>{
      if(r.id == 'inbox'){
        return true
      }
      return false
    })

    if(index != -1){
      this.list[index].count = inboxCount
    }
  }

}

