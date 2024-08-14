import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import * as Parse from 'parse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searching: boolean = false;
  searches: Parse.Object<Parse.Attributes>[] = [];
  searchText: any;

  @Output() onSelectNote = new EventEmitter<Parse.Object>();


  constructor(public auth: AuthService, private router: Router) {}

  goHome() {
    this.router.navigate(['/welcome']);
  }


  logout() {
    if (this.auth.currentUser) {
      Parse.User.logOut();
    }

    this.router.navigate(['welcome']);
  }
}
