import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NumberToWordsPipe } from '../../../pipes/numberToWords.pipe';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, NumberToWordsPipe],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  data: any;
  pdf_date: Date = new Date();
}
