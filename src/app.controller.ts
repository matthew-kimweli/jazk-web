import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";
const puppeteer = require("puppeteer");
const fs = require("fs");

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
    console.log('emailing quote')

    try {
      // Launch Puppeteer
      const browser = await puppeteer.launch({
        executablePath: '/home/runner/.cache/puppeteer/chrome/linux-128.0.6613.86/chrome-linux64/chrome',
        headless: true, // change to true if you want headless mode
      });
      const page = await browser.newPage();
      console.log('emailing 1')

      // Set HTML content
      await page.setContent(invoiceHtml);
      console.log('emailing 2')

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: "A4" });
      console.log('emailing 3')

      await browser.close();
      console.log('emailing 4')

      // Save the PDF to the filesystem (optional)
      // fs.writeFileSync("quote.pdf", pdfBuffer);

      // Send the PDF as an email attachment
      await this.appService.sendEmailWithAttachment(pdfBuffer, client);

      res.status(200).send("Invoice PDF generated and emailed successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating PDF");
    }
  }
}
