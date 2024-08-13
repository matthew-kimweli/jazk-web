import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string, arg?:any):SafeHtml {
    if(arg){
      return this._sanitizer.bypassSecurityTrustResourceUrl(v);  
    }
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
