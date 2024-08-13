import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../_components/header/header.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
