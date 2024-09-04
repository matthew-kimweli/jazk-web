import { Injectable } from "@nestjs/common";

const nodemailer = require("nodemailer");
let unirest = require("unirest");

@Injectable()
export class AppService {


    
  onModuleInit() {
    this.initCloudFunctions();
  }

  getHello(): string {
    return "Hello World!";
  }

  async sendEmailWithAttachment(pdfBuffer, client) {
    // Configure nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail', 'yahoo', etc.
      auth: {
        user: "congounlocked@gmail.com",
        pass: "qywswupsbdqsntuw",
      },
    });

    // Email options
    let mailOptions = {
      from: "congounlocked@gmail.com",
      to: client.email,
      subject: "Quotation PDF",
      text: `Hi, ${client.name}, please find attached the quotation PDF.`,
      attachments: [
        {
          filename: "quotation.pdf",
          content: pdfBuffer,
        },
      ],
    };

    // Send email
    try {
      console.log("sending email");
      let sent = await transporter.sendMail(mailOptions);
      console.log("sent email", sent);
      return sent;
    } catch (error) {
      console.error(error);
    }
  }

  initCloudFunctions() {

    Parse.Cloud.define("paympesa", async (request) => {
      let params = request.params;
      let payload = params.payload;

      try {
        let req = await unirest
          .post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest")
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer d6ApR5S5dIQdvlvaBFA72cC91OKf",
          })
          .send(
            JSON.stringify({
              BusinessShortCode: 174379,
              Password:
                "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwOTA0MTgwNjE2",
              Timestamp: "20240904180616",
              TransactionType: "CustomerPayBillOnline",
              Amount: 1,
              PartyA: 254708374149,
              PartyB: 174379,
              PhoneNumber: 254708374149,
              CallBackURL: "https://jazk-web-fgefcwaabpdbchbr.northeurope-01.azurewebsites.net/receivepayment",
              AccountReference: "CompanyXLTD",
              TransactionDesc: "Payment of X",
            })
          );
    
        if (req.error) throw new Error(req.error);
        console.log(req.raw_body);
        return req.raw_body
      } catch (error) {
        console.error("Request failed:", error);
      }

    });
  }
}
