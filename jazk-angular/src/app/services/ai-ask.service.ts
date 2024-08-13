import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class AiAskService {

  private gracUrl2 = 'https://api.grac33.com/aorbot/askDebunk';
  private linkpreviewUrl = 'https://api.plot411.com/buzz/linkpreview';
  
  searchQuery: any;
  ipAddress: any;
  question: any;

  constructor(private http: HttpClient) {}


  askDebunk(askedText: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      text: askedText,
    };

    console.log('body', body)

    //@ts-ignore
    return this.http.post<any>(this.gracUrl2, body, { headers});
  }

  getLinkPreview(link: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      link: link,
    };

    return this.http.post<any>(this.linkpreviewUrl, body, { headers});
  }

  public getIPAddress(cb:any)  
  {  
    return this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{  
      this.ipAddress=res.ip;
      console.log('my ip', this.ipAddress)
      cb()  
    });  
  }  



  async registerVisit(page:string){
    try {
      let Visit = Parse.Object.extend('GracSiteVisit')
    let visit = new Visit()
    visit.set('page', page)
    if(this.ipAddress){
      visit.set('ipAddress', this.ipAddress)
    }
    await visit.save()
    } catch (error) {
      console.error(error)
    }
  }

  
}
