import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords',
  standalone: true
})
export class NumberToWordsPipe implements PipeTransform {
  transform(value: number): string {
    // Round off the decimal part to zero
    value = Math.floor(value);

    if (value === 0) {
      return 'zero';
    }
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const numWords = ['', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion'];
    let words = '';

    for (let i = 0; i < numWords.length; i++) {
      const threeDigits = value % 1000;
      if (threeDigits !== 0) {
        let word = '';
        const hundreds = Math.floor(threeDigits / 100);
        const tensAndOnes = threeDigits % 100;
        if (hundreds !== 0) {
          word += ones[hundreds] + ' hundred ';
        }
        if (tensAndOnes !== 0) {
          if (tensAndOnes < 20) {
            word += ones[tensAndOnes];
          } else {
            const tensDigit = Math.floor(tensAndOnes / 10);
            const onesDigit = tensAndOnes % 10;
            word += tens[tensDigit];
            if (onesDigit !== 0) {
              word += '-' + ones[onesDigit];
            }
          }
        }
        words = word + numWords[i] + ' ' + words;
      }
      value = Math.floor(value / 1000);
    }
    return words.trim();
  }
}
