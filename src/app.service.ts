import { Injectable } from "@nestjs/common";

const nodemailer = require("nodemailer");
// let unirest = require("unirest");
const axios = require("axios");

import { Utils } from "./utils";
const puppeteer = require("puppeteer");

@Injectable()
export class AppService {
  utils = new Utils();
  verificationCodes = {};
  debugging: any = true;

  onModuleInit() {
    this.initCloudFunctions();
    // this.generateDocument('https://stackoverflow.com/questions/51466388/puppeteer-how-to-connect-wsendpoint-using-local-ip-address')
  }

  getHello(): string {
    return "Hello World!";
  }

  getFormattedDate() {
    var date = new Date();
    var formattedDate = date.toISOString().substring(0, 10).replace(/-/g, "");
    console.log(formattedDate);
    let today = formattedDate;
    return today;
  }

  formatDateSlash(d) {
    let date = new Date(d)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      // Connecting to browserlesss
      // const browser = await puppeteer.connect({
      //   // browserWSEndpoint:
      //   //   "wss://143.198.68.104:49805",
      //   //   ignoreHTTPSErrors: true
      //   headless: true,
      //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // });

      const browser = await puppeteer.launch({
        headless: true,
        // executablePath: "./google-chrome", //path.join(__dirname, "../google-chrome"), // Path to the Chrome binary
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0" });

      // Set HTML content
      // await page.setContent(invoiceHtml);

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      console.log("emailing 3");

      await browser.close();
      console.log("emailing 4");

      return pdfBuffer;
    } catch (error) {
      console.error(error);
    }
  }

  async issueDMVICCertificate(params) {
    let phone = params.phone;
    let quote_data = params.quote_data;
    let quote_id = params.quote_id;
    let quoteDB = params.quoteDB;
    let sale_data = params.sale_data
    let sale_id = params.sale_id;
    let agent_email = params.agent_email;
    let client_email = params.client_email;
    let client = params.client || {};

    let cert_params = {
      endpoint: "Integration/IssuanceTypeCCertificate",
      body: {
        IntermediaryIRANumber: "",
        Typeofcover: 100,
        Policyholder: sale_data.insurance_data.kyc.name,
        InsuredPIN: sale_data.insurance_data.vehicle.pTin,
        policynumber: "P/109/1002/2023/000064",
        Email: client_email,
        Phonenumber: sale_data.insurance_data.kyc.phone,
        Commencingdate: this.formatDateSlash(sale_data.insurance_data.coverStartDate),
        Expiringdate: this.formatDateSlash(sale_data.insurance_data.coverEndDate),
        Registrationnumber: "",
        Vehiclemake: sale_data.insurance_data.vehicle.vehicleMake,
        Vehiclemodel: sale_data.insurance_data.vehicle.vehicleModel,
        Chassisnumber: sale_data.insurance_data.vehicle.chasisNumber,
        Enginenumber: sale_data.insurance_data.vehicle.EngineNumber,
        Bodytype: sale_data.insurance_data.vehicle.bodyType,
        SumInsured: quote_data.sumInsured,
        Yearofmanufacture: quote_data.yearOfManufacture,
        HudumaNumber: "123456789",
      },
    };
    let res = await Parse.Cloud.run("dmvic_request", cert_params);
    console.log("res", res);

    let d = {
      Inputs:
        '{"intermediaryiranumber":"","typeofcover":100,"policyholder":"HENIMMANS EDWARD BWOGA","insuredpin":"A006632277B","policynumber":"P/109/1002/2023/000064","email":"henimmans@gmail.com","phonenumber":"721726738","commencingdate":"07/11/2024","expiringdate":"06/12/2024","registrationnumber":"","vehiclemake":"Toyota","vehiclemodel":"Land Cruiser 76","chassisnumber":"HZJ76-1234567","enginenumber":"1HZ-12345","bodytype":"STATION WAGON","suminsured":"1300000","yearofmanufacture":2017,"hudumanumber":"123456789"}',
      callbackObj: {
        issueCertificate: {
          TransactionNo: "UAT-QAA3742",
          actualCNo: "C27346914",
          Email: "henimmans@gmail.com",
        },
      },
      success: true,
      Error: [],
      APIRequestNumber: "UAT-OAR7423",
      DMVICRefNo: null,
    };

    try {
      let query = new Parse.Query("JazkeSale");
      let saleDB = await query.get(sale_id);

      saleDB.set("dmvic_cert", res);
      await saleDB.save();
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
      let client_email = params.client_email;
      let client = params.client || {};
      let host = "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io"; // Use an environment variable or default to 'localhost'

        if(this.debugging){
          host = 'http://localhost:4200'
        }

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

      this.issueDMVICCertificate(params);

      let today = this.getFormattedDate();

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
              this.issueDMVICCertificate(params);

              let emails = [client.email, agent_email];

              let valuationLetterBuffer = await this.generateDocument(
                `${host}/valuation-letter/${sale_id}`
              );
              let receiptBuffer = await this.generateDocument(
                `${host}/receipt/${sale_id}`
              );
              let debitNoteBuffer = await this.generateDocument(
                `${host}/debitnote/${sale_id}`
              );
              let policyScheduleBuffer = await this.generateDocument(
                `${host}/policyschedule/${sale_id}`
              );

              let email_params: any = {
                from: "saleske@allianz.com",
                subject: `Motor Insurance: Your Jubilee Allianz Policy Package`,
                text: `Hi ${client.name}. Please find attached your insurance policy package.`,
                amount: "500",
                to: emails,
                cc: ["saleske@allianz.com"],
                attachments: [
                  {
                    filename: `Debit Credit Note - ${today}.pdf`,
                    content: debitNoteBuffer,
                    // path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/debit_credit_note.pdf`,
                  },
                  {
                    filename: `Receipt - ${today}.pdf`,
                    content: receiptBuffer,
                    // path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/receipt.pdf`,
                  },
                  {
                    filename: `Valuation Letter - ${today}.pdf`,
                    content: valuationLetterBuffer,
                    // path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/valuation-letter.pdf`,
                  },
                  {
                    filename: `Policy Schedule - ${today}.pdf`,
                    content: policyScheduleBuffer,
                  },
                ],
              };

              if (d.motorClass == "private") {
                if (d.motorSubclass == "Standard Auto") {
                  email_params.attachments.push({
                    filename: `${today} - Motor private Standard Auto Insurance.pdf`,
                    path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/motor-private.pdf`,
                  });
                } else {
                  email_params.attachments.push({
                    filename: `${today} - Motor private Premia Insurance.pdf`,
                    path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/motor-premia.pdf`,
                  });
                }
              } else {
                email_params.attachments.push({
                  filename: `${today} - Motor commercial Insurance.pdf`,
                  path: `https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/assets/data/motor-commercial.pdf`,
                });
              }

              console.log("params", email_params);
              this.utils.sendEmail(email_params);
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

    Parse.Cloud.define("dmvic_request", async (request) => {
      let params = request.params;
      let baseUrl = "https://uat-api.dmvic.com/api/v5";
      let tokenUrl = "http://10.158.2.21:8080/api/get-aki-token";
      let endpoint = params.endpoint;
      let post_body = params.body;

      try {
        // const response = await axios.get(tokenUrl, {
        //   // headers: {
        //   //   Authorization:
        //   //     "Basic S3FUNDk2V1c1V09LMmxjT3AwdnRzQjZxVWFYaHl0UXhwbUdzS2FWS1kza0xNTzA4OlVyaU1lT0NQamVlMDNuaFo0SDZhTlZsNkU0ZWJ2TEExQWNWbnFnRnUxb08yZmJ3c0FkSU1vN2VTWEdXMmRERWM=",
        //   // },
        // });

        // console.log("access token", response.data);
        let tokenData: any = {
          access_token: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjVCQjRFNjE4NzdGNTMxRUJDQUZCOEIwMEFGRjkzMkU5QkI2Qjc0NjQiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiSU5TQVBJVVNFUiIsInByaW1hcnlzaWQiOiI4MUI4RkJBMi0yRjA3LTRDRjAtOEZEQi0zQzYwMDE1ODMyNUUiLCJwcmltYXJ5Z3JvdXBzaWQiOiIyNiIsImxvZ2luaGlzdG9yeSI6IjQyMzY2MSIsIm5iZiI6MTcyNzY4Nzk0MiwiZXhwIjoxNzI4MjkyNzQyLCJpYXQiOjE3Mjc2ODc5NDIsImlzcyI6Imh0dHBzOi8vdWF0LWFwaS5kbXZpYy5jb20iLCJhdWQiOiJodHRwczovL3VhdC1hcGkuZG12aWMuY29tIn0.bDUuolu1lbEUAPCQmTH-OU7VzlgitZ06e8Zmh_H-dwnoqrYUuwa2zrxLpOVTaN3Cm88zLgVY7MwyOs-WMskbqZuJeAg85uSZKRpUBu-80NyjU-FOj_z2wVKSO4Efnq7jJ-NUK7okENwexuVBxqsVJ1JUt4NszXGyUUJBWZpYsHBmX_LAuoQScgBrDiBDDSoewwTVt6JeTaZK-Hwsxk20hdLdDl1sFb2pZi3RJmVFs46BbRxKEG0ipYBAu8sFK4g_fzQOZH2-fI2947XOGnE8ru5q8KxPpbYoLi_e3li-rs-5_gR3k15KHd_8MLFMNXomr9P8SD8K88hKyF4yg4X6Ng`,
        }; //response.data;
        if (tokenData && tokenData.access_token) {
          const response = await axios.post(
            `${baseUrl}/${endpoint}`,
            post_body,

            {
              headers: {
                "Content-Type": "application/json",
                ClientID: "99EA05B9-7515-4338-A7A2-B8515BD712E8",
                Authorization: `Bearer ${tokenData.access_token}`,
              },
            }
          );
          console.log(response.data);
          return response.data;
        }
      } catch (error) {
        console.error("Request failed:", error);
        return String(error).toString();
      }
    });

    Parse.Cloud.define("iprs_request", async (request) => {
      let params = request.params;

      let id_number = params.id_number;

      // Define your proxy configuration
      const proxyConfig = {
        host: "192.168.52.47", // e.g., '127.0.0.1'
        port: 3128, // e.g., 8080
        auth: {
          username: "christinkiambi", // Optional, if your proxy requires authentication
          password: "Abc@jick93!", // Optional
        },
      };

      // Define the data you want to sendd
      const data = {
        id_number: id_number,
      };

      // Define the endpoint you want to POST to
      // const endpoint = "http://tempuri.org/IServiceIPRS/GetDataByIdCard";
      const endpoint = "http://10.1.1.5:9003/IServiceIPRS/GetDataByIdCard";

      try {
        const response = axios.post(endpoint, data, {
          proxy: proxyConfig,
        });

        console.log("Response:", response.data);
      } catch (error) {
        console.error(error);
      }
    });

    Parse.Cloud.define("sendOTP", async (request) => {
      let phone = request.params.phone;
      let code = Math.floor(100000 + Math.random() * 900000);

      if (String(phone).endsWith("212702275231")) {
        code = 12345;
      } else if (String(phone).endsWith("773314578")) {
        code = 12345;
      } else if (String(phone).endsWith("773548160")) {
        code = 12345;
      }

      // code = 12345;

      this.verificationCodes[Number(phone).toString()] = code;
      let text = `Your otp code for JAZK is ${code}`;

      // if(code == 12345){
      //   return;
      // }

      let resend = request.params.resend;
      if (resend) {
        this.utils.sendInfoBipSMS(text, phone);
      } else {
        // this.utils.sendAfricasTalkingSMS(text, phone)
        this.utils.sendInfoBipSMS(text, phone);
      }
    });

    Parse.Cloud.define("verifyOTP", async (request) => {
      let phone = request.params.phone;
      let code = request.params.code;
      let oc = this.verificationCodes[Number(phone).toString()];
      if (oc == code) {
        return { status: "verified", phone: phone, code: code };
      } else {
        return { status: "not-verified", phone: phone, code: code };
      }
    });

    Parse.Cloud.define("getUser", async (request) => {
      let params = request.params;
      let p = params.phone;

      let query = new Parse.Query(Parse.User);
      // query.equalTo('phones', p)
      query.equalTo("phone", Number(p).toString());
      let first = await query.first({ useMasterKey: true });
      return {
        user: first,
      };
    });

    Parse.Cloud.define("getUser2", async (request) => {
      let params = request.params;
      let p = params.phone;

      let query = new Parse.Query("UserRegistry");
      // query.equalTo('phones', p)
      query.equalTo("phone", Number(p).toString());
      let first = await query.first({ useMasterKey: true });
      return {
        user: first,
      };
    });
  }
}
