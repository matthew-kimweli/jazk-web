import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

}
