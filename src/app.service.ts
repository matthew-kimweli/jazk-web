import { Injectable } from "@nestjs/common";

const nodemailer = require("nodemailer");
// let unirest = require("unirest");
const axios = require("axios");
import { Utils } from "./utils";
const puppeteer = require("puppeteer");

@Injectable()
export class AppService {
  utils = new Utils();

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

  async generateDocument(url) {

    try {
     
      // Connecting to browserless
      const browser = await puppeteer.connect({
        browserWSEndpoint:
          "https://production-sfo.browserless.io/?token=QmuE8WkTVYM8xc2da8679cf58e5ec565146f438cfd",
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Set HTML content
      // await page.setContent(invoiceHtml);

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true
      });
      console.log("emailing 3");

      await browser.close();
      console.log("emailing 4");

      return pdfBuffer

    } catch (error) {
      console.error(error);
      
    }
  }

  initCloudFunctions() {
    Parse.Cloud.define("paympesa", async (request) => {
      let params = request.params;
      let phone = params.phone;
      let quote_data = params.quote_data;
      let quote_id = params.quote_id;
      let sale_id = params.sale_id;
      let agent_email = params.agent_email;
      let client = params.client || {};
      const host = process.env.HOST || 'https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io';  // Use an environment variable or default to 'localhost'


      function getTimestamp() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
      }

      try {
        const response = await axios.get(
          "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
          {
            headers: {
              Authorization:
                "Basic S3FUNDk2V1c1V09LMmxjT3AwdnRzQjZxVWFYaHl0UXhwbUdzS2FWS1kza0xNTzA4OlVyaU1lT0NQamVlMDNuaFo0SDZhTlZsNkU0ZWJ2TEExQWNWbnFnRnUxb08yZmJ3c0FkSU1vN2VTWEdXMmRERWM=",
            },
          }
        );

        // {
        //   "BusinessShortCode": 174379,
        //   "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwOTA1MTAxNDM0",
        //   "Timestamp": getTimestamp(),
        //   "TransactionType": "CustomerPayBillOnline",
        //   "Amount": 1,
        //   "PartyA": 254708374149,
        //   "PartyB": 174379,
        //   "PhoneNumber": 254708374149,
        //   "CallBackURL": "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/receivepayment",
        //   "AccountReference": "CompanyXLTD",
        //   "TransactionDesc": "Payment of Motor Insurance"
        // },
        console.log("access token", response.data);
        let tokenData = response.data;
        if (tokenData && tokenData.access_token) {
          const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
              BusinessShortCode: 174379,
              Password:
                "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwOTA1MTAxNDM0",
              Timestamp: "20240905101434",
              TransactionType: "CustomerPayBillOnline",
              Amount: 1,
              PartyA: phone,
              PartyB: 174379,
              PhoneNumber: phone, //254708374149,
              CallBackURL:
                "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/receivepayment",
              AccountReference: "CompanyXLTD",
              TransactionDesc: "Payment of Motor Insurance",
            },

            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData.access_token}`,
              },
            }
          );
          console.log(response.data);
          let res_data = response.data;

          let ResponseDescription = res_data["ResponseDescription"];
          let CheckoutRequestID = res_data["CheckoutRequestID"];

          if (
            ResponseDescription == "Success. Request accepted for processing"
          ) {
            let d = quote_data;
            if (quote_data) {
              var date = new Date(); // create a new date object
              var formattedDate = date
                .toISOString()
                .substring(0, 10)
                .replace(/-/g, "");
              console.log(formattedDate);
              let today = formattedDate;

              let emails = [client.email, agent_email];

              let valuationLetterBuffer = await this.generateDocument(`${host}/valuation-letter/${sale_id}`)
              let receiptBuffer = await this.generateDocument(`${host}/receipt/${sale_id}`)
              let debitNoteBuffer = await this.generateDocument(`${host}/debitnote/${sale_id}`)
              let policyScheduleBuffer = await this.generateDocument(`${host}/policyschedule/${sale_id}`)

              let params:any = {
                from: "saleske@allianz.com",
                subject: `Motor Insurance: Your Jubilee Allianz Quotation`,
                text: `Hi ${client.name}. Thank you for showing interest in our insurance service. Please find attached your insurance policy package.`,
                amount: "500",
                to: emails,
                cc: ["saleske@allianz.com"],
                attachments: [
                  {
                    filename: `${today} - Debit Credit Note.pdf`,
                    content: debitNoteBuffer,
                    // path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/debit_credit_note.pdf`,
                  },
                  {
                    filename: `${today} - Receipt.pdf`,
                    content: receiptBuffer,
                    // path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/receipt.pdf`,
                  },
                  {
                    filename: `${today} - Valuation Letter.pdf`,
                    content: valuationLetterBuffer,
                    // path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/valuation-letter.pdf`,
                  },
                  {
                    filename: `${today} - Policy Schedule.pdf`,
                    content: policyScheduleBuffer,
                  },
                ],
              };

              if (d.motorClass == "private") {
                if (d.motorSubclass == "Standard Auto") {
                  params.attachments.push({
                    filename: `${today} - Motor private Standard Auto Insurance.pdf`,
                    path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/motor-private.pdf`,
                  });
                } else {
                  params.attachments.push({
                    filename: `${today} - Motor private Premia Insurance.pdf`,
                    path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/motor-premia.pdf`,
                  });
                }
              } else {
                params.attachments.push({
                  filename: `${today} - Motor commercial Insurance.pdf`,
                  path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/motor-commercial.pdf`,
                });
              }

              console.log("params", params);
              this.utils.sendEmail(params);
              // let resp = await Parse.Cloud.run("sendMail", params);
            }
          } else {
          }

          return response.data;
        }
      } catch (error) {
        console.error("Request failed:", error);
        return String(error).toString();
      }
    });

    Parse.Cloud.define("sendMail", async (request) => {
      let params = request.params;
      return await this.utils.sendEmail(params);
    });
  }
}
