import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NumberToWordsPipe } from '../../../pipes/numberToWords.pipe';

@Component({
  selector: 'app-debit-note',
  standalone: true,
  imports: [CommonModule, NumberToWordsPipe],
  templateUrl: './debit-note.component.html',
  styleUrl: './debit-note.component.css'
})
export class DebitNoteComponent {
  data: any;
  pdf_date: Date = new Date();

}
