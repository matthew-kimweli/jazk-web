import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
// import { parseString } from 'xml2js';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  programs: any;
  selectedMedia: any;
  fetchedMedia: any = {};
  selectedCaption: any;
  isAdmin: any = false;
  lastResponse: any;
  ads: any;
  currentResponse: any;
  selectedChunk: any;


  constructor(
    
    private route: Router,
    public http: HttpClient,) {

  }

  isDesktop(){
    // return this.platform.is('desktop')
  }


  formatDateToYYYYMMDD(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  formatDate(date: Date) {
    var formattedDate = date.toISOString().substring(0, 10); // format the date as yyyy-mm-dd and remove the time and timezone
    console.log(formattedDate); // output the formatted date
    return formattedDate;
  }

  formatDateToddMMyy(date: Date) {

    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;
    return formatted

  }

  formatDateStringToddMMyy(datestring: any) {
    // Date.parse(datestring)
    let date = new Date(datestring)

    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;
    return formatted

  }



  formatDateToWords() {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const customDateString = `${dayOfWeek} ${day} ${month} ${year}`;
    return customDateString;
  }


  sanitizeFileName(fileName: any) {
    // Remove all characters that are not letters (alphabetic characters)
    return fileName.replace(/[^a-zA-Z]/g, '');
  }



  convertTimeFormat(inputTime: any) {
    const parts = inputTime.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds.toFixed(3);
  }


  getData(vidId: any): Observable<any> {
    let url = `https://pipedapi.kavin.rocks/streams/${vidId}`
    return this.http.get<any>(url);
  }

  getUrlData(url: any): Observable<any> {
    return this.http.get<any>(url);
  }

  // getXmlData(url: string): Observable<any> {
  //   return this.http.get(url, { responseType: 'text' }).pipe(
  //     // Parse the XML response to JSON
  //     map((xmlData: string) => {
  //       let jsonData: any;
  //       parseString(xmlData, { explicitArray: false, ignoreAttrs: false }, (error, result) => {
  //         if (error) {
  //           console.error('Error parsing XML:', error);
  //         } else {
  //           jsonData = result.tt.body.div.p.map((r: any) => {
  //             return {
  //               begin: r.$.begin,
  //               end: r.$.end,
  //               text: r._,
  //               beginTime: this.convertTimeFormat(r.$.begin),
  //               endTime: this.convertTimeFormat(r.$.end)
  //             }
  //           });

  //           // jsonData = result
  //         }
  //       });
  //       return jsonData;
  //     })
  //   );
  // }


  getVideoIdFromUrl(url: string): string | null {
    // Remove query parameters
    const urlWithoutQuery = url.split('?')[0];

    // Handle youtu.be URLs
    const youtuDotBeRegex = /youtu\.be\/([^?&]+)/;
    const youtuDotBeMatch = urlWithoutQuery.match(youtuDotBeRegex);

    if (youtuDotBeMatch) {
      return youtuDotBeMatch[1];
    }

    // Handle regular YouTube URLs with query parameters
    const videoIdRegex = /[?&]v=([^?&]+)/;
    const match = url.match(videoIdRegex);

    return match ? match[1] : null;
  }

  convertTextToArray(text: any) {
    // Replace line breaks with spaces and split the text into an array of strings
    var arrayOfStrings = text.replace(/[\n\r]+/g, ' ').split(" ");

    // Remove spaces and empty strings
    arrayOfStrings = arrayOfStrings.filter((str: any) => {
      return str.trim() !== "";
    });

    // Remove duplicates using Set
    arrayOfStrings = [...new Set(arrayOfStrings)];

    return arrayOfStrings;
  }

  updateTimeFormat(originalTime: any) {
    // Split the original time into parts based on either ':' or '.'
    const timeParts = originalTime.split(/[:.]/);

    // If the hours part is greater than zero, remove milliseconds
    const hours = parseInt(timeParts[0], 10);
    const updatedTime =
      hours > 0
        ? timeParts.slice(0, 3).join('.')
        : timeParts.slice(1, 3).join('.');

    return updatedTime;


  }


  async delay(milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


}
