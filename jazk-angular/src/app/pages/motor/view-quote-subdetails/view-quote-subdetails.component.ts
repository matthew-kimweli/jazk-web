import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MotorService } from '../../../services/motor.service';
import { ParseService } from '../../../services/parse.service';
import * as Parse from 'parse';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-view-quote-subdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-quote-subdetails.component.html',
  styleUrl: './view-quote-subdetails.component.css',
})
export class ViewQuoteSubdetailsComponent {
  quote: any;
  currentDate: Date = new Date();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public parseService: ParseService,
    private dataService: DataService,
    public motorService: MotorService,
    public authService: AuthService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];

      if (id) {
        this.fetchQuotation(id);
      }
    });
  }

  roundNumber(value: number): number {
    return Math.round(value);
  }

  async fetchQuotation(id: any) {
    try {
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeQuotation');
      let quote = await query.get(id);
      console.log('quote', quote);
      if (quote) {
        this.motorService.motorQuotation = quote.get('quoteData');
        this.quote = quote.attributes;

        let client = quote.get('client');
        if (client) {
          
          if (!client.emailSent) {
            // this.sendEmailQuotation(client);
            setTimeout(() => {
              this.sendEmailQuotation(client);
            }, 3000);

            client.emailSent = true;
            quote.set('client', client);
            quote.save();
          }
        }
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

  calculateCourtesyCarValue(): number | string {
    const benefit = this.quote.quoteData.courtesyCarInterest;

    switch (benefit) {
      case '30 Days':
        return 5000 * 30;
      case '20 Days':
        return 5000 * 20;
      case '10 Days':
        return 5000 * 10;
      default:
        return '';
    }
  }

  sendEmailQuotation(client: any) {
    const invoiceElement = document.getElementById('policyquote');
    console.log('invocie element', invoiceElement);
    if (invoiceElement) {
      // Get the full HTML document including the <head> and <body> to retain styles
      const fullHtml = `
<!doctype html>
<html lang="en" data-critters-container>

<head>
  <meta charset="utf-8">
  <title>Sales Portal</title>
  <meta name="keywords" content="sales">
  <meta name="author" content="JazKe">
  <meta name="description" content="Sales Portal">
  <base href="/">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
  <meta name="viewport" content="height=device-height, 
                      width=device-width, initial-scale=1.0, 
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no, target-densitydpi=device-dpi">

  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/css/tabler.min.css">
  <script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/js/tabler.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

</head>
<style>

@font-face {
    font-family: 'customCalibri';
    src: url('assets/fonts/AAAAAF-Helvetica-Bold.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  

  :root {
    --tblr-font-sans-serif: 'Inter';
  }


    .container {
  max-width: 900px;
  background-color: #fff;
  font-family: 'customCalibri', sans-serif;
  /* font-weight: 500; */
}

.fw-lightered {
  font-weight: 100 !important;
}

.body-border {
  border: 1.5px solid black;
}

.h-20px {
  height: 20px;
}

.h-10px {
  height: 10px;
}

.body-border-1 {
  border-left: 1.5px solid black;
}

.body-border-2 {
  border-top: 1.5px solid black;
}

.body-border-3 {
  border-right: 1.5px solid black;
}

.body-border-4 {
  border-bottom: 1.5px solid black;
}

.footer-border {
  border: 2px solid black;
}

.footer-bg-color {
  background-color: rgba(229, 219, 255, 1);
}

.footer-bg-color-1 {
  background-color: #d4eaea;
}

.header-bg-color {
  background-color: rgba(255, 249, 224, 1);
}

.no-background {
  background-color: transparent;
}

p {
  line-height: 1.5;
}

.custom-text {
  line-height: 1.2;
}

.border-bottom-1 {
  border-bottom: 1.5px solid black;
}

.footer-border-top {
  border-top: 2px solid #003781;
}

.footer-border-top-1 {
  border-top: 1.5px solid #003781;
}

.header-border-top-1 {
  border-bottom: 1.5px solid #003781;
}

.footer-border-bottom {
  border-bottom: 2px solid #003781;
}

.text-custom-blue {
  color: #003781;
}

.header-border-x {
  border-left: 2px solid #003781;
  border-right: 2px solid #003781;
}

.header-border-x-1 {
  border-left: 1.5px solid #003781;
  border-right: 1.5px solid #003781;
}

.footer-border-x {
  border-left: 2px solid black;
  border-right: 2px solid black;
}

.footer-border-x1 {
  border-left: 2px solid black;
}

.footer-border-x2 {
  border-right: 2px solid black;
}

.footer-border-y1 {
  border-bottom: 2px solid black;
}

.footer-border-y2 {
  border-top: 2px solid black;
}

.custom-bg {
  background-color: #003781;
  color: white;
}

.custom-bg-grey {
  background-color: #f3f5f7; /* A grey shade between light and secondary */
}

.dotted-list {
  list-style-type: none;
}
.dotted-list li {
  position: relative;
  padding-left: 10px;
}

.dotted-list li:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
}


</style>


<body >

<div class="page-wrapper">
  <div class="page-body">
    <div class="container-xl">
${invoiceElement.outerHTML}

</div>
</div>
</div>
</body>

</html>`;

      console.log('Sending email', client);
      console.log('html', fullHtml);

      this.dataService.httpClient
        .post(
          'https://jazk-web-fgefcwaabpdbchbr.northeurope-01.azurewebsites.net/emailquote',
          { invoiceHtml: fullHtml, client: client }
        )
        .subscribe(
          (response) => {
            console.log('PDF generation and email were successful');
          },
          (error) => {
            console.error('Error generating PDF', error);
          }
        );
    }
  }
}
