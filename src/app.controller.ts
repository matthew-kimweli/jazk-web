import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";
const puppeteer = require("puppeteer");
const fs = require("fs");

const path = require("path");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  getHealth(@Req() req): any {
    const originHost = req.headers.host;

    return "health";
  }

  @Post("emailquote")
  async sendQuotation(@Req() req, @Res() res): Promise<any> {
    const body = req.body;
    let invoiceHtml = body.invoiceHtml;
    let client = body.client;
    console.log("emailing quote");

    try {
      // Launch Puppeteer

      const browser = await puppeteer.launch({
        headless: true,
        // executablePath: "./google-chrome", //path.join(__dirname, "../google-chrome"), // Path to the Chrome binary
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });


      // Connecting to browserless
      // const browser = await puppeteer.connect({
      //   browserWSEndpoint: "wss://api.grac33.com:49805/devtools/browser/a4d71815-7a8f-4eb4-a335-12f8b33f41d3",
      // });

      const page = await browser.newPage();
      console.log("emailing 1");

      // Set HTML content
      await page.setContent(invoiceHtml);
      console.log("emailing 2");

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true
      });
      console.log("emailing 3");

      await browser.close();
      console.log("emailing 4");

      // Save the PDF to the filesystem (optional)
      // fs.writeFileSync("quote.pdf", pdfBuffer);

      // Send the PDF as an email attachment
      await this.appService.sendEmailWithAttachment(pdfBuffer, client);

      res.status(200).send({text: "Invoice PDF generated and emailed successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating PDF: " + String(error).toString());
    }
  }

  @Post("receivepayment")
  async receivepayment(@Req() req, @Res() res): Promise<any> {
    const body = req.body;
    console.log("payment notfication", body);
    let Payment = Parse.Object.extend('JazkePaymentNotification')
    let p = new Payment()
    try {
      await p.save(body)
      console.log("payment saved");
    } catch (error) {
      console.error(error)
    }
  }

  @Post("receivevaluation")
  async receivevaluation(@Req() req, @Res() res): Promise<any> {
    const body = req.body;
    console.log("valuation notfication", body);
    let Payment = Parse.Object.extend('JazkeValuation')
    let p = new Payment()
    try {
      await p.save(body)
      console.log("payment saved");
    } catch (error) {
      console.error(error)
    }
  }

  

}
