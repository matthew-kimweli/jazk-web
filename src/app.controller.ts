import { Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
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
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      console.log("emailing 3");

      await browser.close();
      console.log("emailing 4");

      // Save the PDF to the filesystem (optional)
      // fs.writeFileSync("quote.pdf", pdfBuffer);

      // Send the PDF as an email attachment
      await this.appService.sendEmailWithAttachment(pdfBuffer, client);

      res
        .status(200)
        .send({ text: "Invoice PDF generated and emailed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating PDF: " + String(error).toString());
    }
  }

  @Post("receivepayment")
  async receivepayment(@Req() req, @Res() res): Promise<any> {
    const body = req.body;
    console.log("payment notfication", body);
    let Payment = Parse.Object.extend("JazkePaymentNotification");
    let p = new Payment();
    try {
      await p.save(body);

      let d = body
      
      // {
      //   Body: {
      //     stkCallback: {
      //       MerchantRequestID: "29115-34620561-1",
      //       CheckoutRequestID: "ws_CO_191220191020363925",
      //       ResultCode: 0,
      //       ResultDesc: "The service request is processed successfully.",
      //       CallbackMetadata: {
      //         Item: [
      //           {
      //             Name: "Amount",
      //             Value: 1.0,
      //           },
      //           {
      //             Name: "MpesaReceiptNumber",
      //             Value: "NLJ7RT61SV",
      //           },
      //           {
      //             Name: "TransactionDate",
      //             Value: 20191219102115,
      //           },
      //           {
      //             Name: "PhoneNumber",
      //             Value: 254708374149,
      //           },
      //         ],
      //       },
      //     },
      //   },
      // };

      let MerchantRequestID = d.Body.stkCallback.MerchantRequestID;
      let CheckoutRequestID = d.Body.stkCallback.CheckoutRequestID;

      let query = new Parse.Query("JazkeSale");
      query.equalTo("merchantRequestID", MerchantRequestID);
      query.equalTo("checkoutRequestID", CheckoutRequestID);
      let sale = await query.first();
      if (sale) {
        sale.addUnique("jazkeSaleIds", p.id);
        sale.addUnique("mpesaNotifications", d);
        if (d.Body.stkCallback.ResultCode == 0) {
          let list = d.Body.stkCallback.CallbackMetadata.Item;
          for (const e of list) {
            if (e.Name == "Amount") {
              sale.increment("paid_amount", Number(e.Value));
            } else {
              sale.set(e.Name, e.Value);
            }
          }
        }

        await sale.save();
      }

      console.log("payment saved");
    } catch (error) {
      console.error(error);
    }
  }

  // @Post("receivevaluation")
  // async receivevaluation(@Req() req, @Res() res): Promise<any> {
  //   const body = req.body;
  //   const clientId = req.headers["client_id"]; // Get client_id from headers
  //   const apiKey = req.headers["api_key"]; // Get api_key from headers

  //   console.log("valuation notfication", body);
  //   let Payment = Parse.Object.extend("JazkeValuation");
  //   let p = new Payment();
  //   try {
  //     p.set("client_id", clientId);
  //     p.set("apiKey", apiKey);
  //     await p.save(body);
  //     console.log("valuation saved", body);
  //     console.log("valuation client_id", clientId);
  //     return {success: true, response_id: p.id, message:'Valuation payload received successfully'}

  //   } catch (error) {
  //     console.error(error);
  //     return {success: false, message:'Valuation payload not saved'}
  //   }

  // }

  @Post("receivevaluation")
  async receivevaluation(@Req() req, @Res() res): Promise<any> {
    const body = req.body;
    const clientId = req.headers["client_id"]; // Get client_id from headers
    const apiKey = req.headers["api_key"]; // Get api_key from headers

    if (!clientId || !apiKey) {
      return res.status(400).json({
        success: false,
        message: "Missing client_id or api_key in headers",
      });
    }

    console.log("valuation notification", body);

    const Payment = Parse.Object.extend("JazkeValuation");
    const p = new Payment();

    try {
      p.set("client_id", clientId);
      p.set("apiKey", apiKey);
      // Object.entries(body).forEach(([key, value]) => p.set(key, value));

      await p.save(body);
      console.log("valuation saved", body);
      console.log("valuation client_id", clientId);

      let r = {
        success: true,
        response_id: p.id,
        message: "Valuation payload received successfully",
      };
      res.status(201).json(r);
    } catch (error) {
      console.error("Error saving valuation:", error);

      return res.status(500).json({
        success: false,
        message: "Valuation payload not saved",
        error: error.message,
      });
    }
  }
}
