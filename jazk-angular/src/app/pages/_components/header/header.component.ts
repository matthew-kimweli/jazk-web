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
    this.router.navigate(['/home']);
  }

  async fetchTranscripts(event: any) {
    let text = event.target.value;
    if (!text) {
      this.searches = [];
      return;
    }
    try {
      this.searching = true;
      let query = new Parse.Query('JazzContract');
      // query.equalTo('userId', this.auth.currentUserId);
      query.matches('name', text, 'i');
      query.descending('createdAt');
      query.limit(3);
      this.searches = await query.find();
      this.searching = false;
      console.log('searches', this.searches);
    } catch (error: any) {
      console.error(error);
      this.searching = false;
    }
  }

  selectNote(lpo: Parse.Object<Parse.Attributes>) {
    this.onSelectNote.emit(lpo);
    this.searchText=''
    this.router.navigate(['/lpo-preview', lpo.id])
  }

  logout() {
    if (this.auth.currentUser) {
      Parse.User.logOut();
    }

    this.router.navigate(['login']);
  }
}
