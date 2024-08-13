import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  file_base_url = `https://api.plot411.com/core`
  file_upload_url = `https://api.plot411.com/core/fileupload`
  blogs: any;
  messages: any = {};
  currentResponse: any;
  uploading: boolean = false;
  uploadProgress: string = '0%';
  tags: any;

  constructor(
    public httpClient: HttpClient
  ) { }


  generateNumber(prefix:string) {
    
    const currentDate = new Date();
    const timeLong = currentDate.getTime()
    // return `P${year}${month}${day}${time}${paddedCounter}`;
    return `${prefix}-${timeLong}`;
  }

  isMobile() {
    var ua = navigator.userAgent;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      return true
    }
    return false;
  }
  uploadFile(file: File): Observable<HttpEvent<any>> {

    let url = this.file_upload_url

    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.httpClient.request(req);
  }

  uploadFileWithProgress(file: File): Observable<any> {
    const url = this.file_upload_url;
    const formData = new FormData();
    formData.append('upload', file);
    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);

    return new Observable((observer) => {
      this.httpClient.request(req).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            //@ts-ignore
            const progress = Math.round((100 * event.loaded) / event.total);
            observer.next({ type: 'progress', progress });
          } else if (event.type === HttpEventType.Response) {
            observer.next({ type: 'complete', body: event.body });
            observer.complete();
          }
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  postDataWithFile(data:any, file: File): Observable<any> {
    const url = 'https://api.grac33.com/aorbot/tulitranscribefile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('objectId', data.objectId);
    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    this.uploading = true;
    this.uploadProgress = '0%'

    return new Observable((observer) => {
      this.httpClient.request(req).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            //@ts-ignore
            const progress = Math.round((100 * event.loaded) / event.total);
            observer.next({ type: 'progress', progress });
            this.uploading = true;
            this.uploadProgress = `${progress}%`;
          } else if (event.type === HttpEventType.Response) {
            observer.next({ type: 'complete', body: event.body });
            observer.complete();
            this.uploading = false;
          }
        },
        (error) => {
          observer.error(error);
          this.uploading = false;
          this.uploadProgress = '0%'
        }
      );
    });
  }
}
