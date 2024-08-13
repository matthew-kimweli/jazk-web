import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../_components/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  user: Parse.User<Parse.Attributes> | undefined;


  constructor(
    public auth: AuthService,
    private toastr: ToastrService,
  ) {
    this.auth.refreshUser()
    this.user = this.auth.currentUser;
  }

}
