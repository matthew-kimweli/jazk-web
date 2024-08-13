import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipePipe implements PipeTransform {

  transform(time: number): string {
    if(!time){
      return '---'
    }
    const minutes: string = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds: string = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }


}
