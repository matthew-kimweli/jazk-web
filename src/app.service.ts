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
  quotationObj = {
    quot_ref: "5773197888",
    quot_paymt_ref: "RIS1VW7M7H",
    quot_paymt_date: "2023-09-26T09:53:00",
    quot_assr_name: "John Doe",
    quot_assr_nic: "3000211a",
    quot_assr_pin: "P00892519Ya",
    quot_assr_phone: "2547xxxxxxxx",
    quot_assr_email: "test@maydenprema.co.ke",
    quot_assr_gender: "M",
    quot_assr_dob: "1999-01-26T00:00:00",
    quot_assr_flexi: {
      quot_assr_addr: {
        pol_addr_01: "P. O. Box 12345-00100",
      },
    },
    proposals: [
      {
        prop_sr_no: 1,
        prop_paymt_ref: "RIS1VW7M7H",
        prop_paymt_date: "2023-09-26T09:53:00",
        pol_quot_sys_id: 0,
        pol_quot_no: "5773197888-1",
        pol_comp_code: "001",
        pol_divn_code: "101",
        pol_dept_code: "10",
        pol_prod_code: "1002",
        pol_type: "1002",
        pol_cust_code: "K9999999",
        pol_assr_code: "K9999999",
        pol_fm_dt: "2023-09-26T00:00:00",
        pol_to_dt: "2024-09-27T00:00:00",
        pol_dflt_si_curr_code: "KES",
        pol_prem_curr_code: "KES",
        pol_flexi: {
          payment_mode_code: {
            pol_flex_10: "4",
          },
          payment_mode_desc: {
            pol_flex_18: "Mpesa - RIS1VW7M7H - 10000",
          },
          cover_type_code: {
            pol_flex_14: "01",
          },
          cover_type_desc: {
            pol_flex_16: "Comprehensive",
          },
          issued_at_code: {
            pol_flex_01: "101",
          },
          issued_at_desc: {
            pol_flex_17: "JAZK HQ",
          },
          prev_policy_no: {
            pol_flex_20: "",
          },
          territory: {
            pol_flex_02: "KENYA",
          },
          broker_risk_note_no: {
            pol_flex_08: "",
          },
        },
        proposalsections: [
          {
            sec_sr_no: 1,
            psec_sec_code: "100201",
            proposalrisks: [
              {
                risk_sr_no: 1,
                prai_flexi: {
                  vehicle_cover_type: {
                    prai_code_21: "01",
                  },
                  vehicle_make: {
                    prai_code_04: "T009",
                  },
                  vehicle_model: {
                    prai_code_05: "AXIO",
                  },
                  vehicle_body_type: {
                    prai_code_01: "001",
                  },
                  vehicle_reg_no: {
                    prai_data_03: "KDD 990Z",
                  },
                  vehicle_chassis_no: {
                    prai_data_01: "chassis 001",
                  },
                  vehicle_engine_no: {
                    prai_data_02: "Engine 001",
                  },
                  vehicle_yom: {
                    prai_num_01: 2019,
                  },
                  vehicle_value: {
                    prai_num_02: 1000000,
                  },
                  vehicle_cc: {
                    prai_num_04: 1800,
                  },
                  seating_capacity: {
                    prai_num_09: 5,
                  },
                  num_pax: {
                    prai_num_03: 4,
                  },
                  vehicle_tonnage: {
                    prai_num_14: 2500,
                  },
                },
                proposalcovers: [
                  {
                    cvr_sr_no: 1,
                    prc_code: "3101",
                    prc_desc: "Own Damage",
                    prc_rate: 1.75,
                    prc_rate_per: 100,
                    prc_si_curr_code: "KES",
                    prc_prem_curr_code: "KES",
                    prc_si_fc: 50000,
                    prc_prem_fc: 875,
                  },
                  {
                    cvr_sr_no: 2,
                    prc_code: "3176",
                    prc_desc: "Third Party Only",
                    prc_rate: 7500,
                    prc_rate_per: 1,
                    prc_si_curr_code: "KES",
                    prc_prem_curr_code: "KES",
                    prc_si_fc: 0,
                    prc_prem_fc: 7500,
                  },
                  {
                    cvr_sr_no: 3,
                    prc_code: "3109",
                    prc_desc: "Windscreen",
                    prc_rate: 0,
                    prc_rate_per: 100,
                    prc_si_curr_code: "KES",
                    prc_prem_curr_code: "KES",
                    prc_si_fc: 100000,
                    prc_prem_fc: 0,
                  },
                  {
                    cvr_sr_no: 4,
                    prc_code: "3110",
                    prc_desc: "Radio Casette",
                    prc_rate: 0,
                    prc_rate_per: 100,
                    prc_si_curr_code: "KES",
                    prc_prem_curr_code: "KES",
                    prc_si_fc: 100000,
                    prc_prem_fc: 0,
                  },
                  {
                    cvr_sr_no: 5,
                    prc_code: "3198",
                    prc_desc: "Excess Protector",
                    prc_rate: 0.25,
                    prc_rate_per: 100,
                    prc_si_curr_code: "KES",
                    prc_prem_curr_code: "KES",
                    prc_si_fc: 0,
                    prc_prem_fc: 2500,
                  },
                  {
                    cvr_sr_no: 6,
                    prc_code: "3199",
                    prc_desc: "Polictical Violence and Terrorism",
                    prc_rate: 0.25,
                    prc_rate_per: 100,
                    prc_si_curr_code: "KES",
                    prc_prem_curr_code: "KES",
                    prc_si_fc: 0,
                    prc_prem_fc: 2500,
                  },
                ],
                proposalmotorcerts: [
                  {
                    motor_cert_sr_no: 1,
                    prai_flexi: {
                      cert_mode: {
                        prai_data_08: "02",
                      },
                      cert_type: {
                        prai_code_14: "Class C",
                      },
                      book_id: {
                        prai_data_09: "DIGI_CERT",
                      },
                      cert_num: {
                        prai_data_05: "C1349985",
                      },
                      cert_fm_dt: {
                        prai_date_21: "2023-09-26T00:00:00",
                      },
                      cert_to_dt: {
                        prai_date_22: "2023-10-25T00:00:00",
                      },
                      cert_name: {
                        prai_data_10: "",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
        proposalcharges: [
          {
            chg_sr_no: 1,
            pchg_code: "2001",
            pchg_type: "002",
            pchg_perc: 40,
            pchg_chg_fc: 40,
            pchg_prem_curr_code: "KES",
            pchg_rate_per: 1,
          },
          {
            chg_sr_no: 2,
            pchg_code: "1004",
            pchg_type: "005",
            pchg_perc: 0.25,
            pchg_chg_fc: 12,
            pchg_prem_curr_code: "KES",
            pchg_rate_per: 100,
          },
          {
            chg_sr_no: 3,
            pchg_code: "2004",
            pchg_type: "002",
            pchg_perc: 0.2,
            pchg_chg_fc: 11,
            pchg_prem_curr_code: "KES",
            pchg_rate_per: 100,
          },
        ],
      },
    ],
  };

  onModuleInit() {
    this.initCloudFunctions();
    // this.sendDummyDoc()
  }

  async sendDummyDoc() {
    try {
      let sale_id = "A4QmZ1Vgel";
      let host =
        "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io";
      let url = `${host}/receipt/${sale_id}`;

      console.log("pupetter url", url);

      const browser = await puppeteer.launch({
        headless: true,
        // executablePath: "./google-chrome", //path.join(__dirname, "../google-chrome"), // Path to the Chrome binary
        executablePath: "/usr/bin/google-chrome-stable",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      console.log("got buffer", pdfBuffer);

      await browser.close();
      console.log("close browser");

      let email_params: any = {
        from: "saleske@allianz.com",
        subject: `Motor Insurance: Your Jubilee Allianz Policy Package`,
        text: `Hi Please find attached your insurance policy package.`,
        amount: "500",
        to: ["ahabweemma@gmail.com"],
        attachments: [
          {
            filename: `Doc.pdf`,
            content: pdfBuffer,
          },
        ],
      };

      console.log("params", email_params);
      this.utils.sendEmail(email_params);
    } catch (error) {
      console.error(error);
    }
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
    let date = new Date(d);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
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

  async generateDocument(url: string) {
    try {
      url = url.trim();
      // Connecting to browserlesss
      // const browser = await puppeteer.connect({
      //   // browserWSEndpoint:
      //   //   "wss://143.198.68.104:49805",
      //   //   ignoreHTTPSErrors: true
      //   headless: true,
      //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // });

      console.log("pupetter url", url);

      const browser = await puppeteer.launch({
        headless: true,
        // executablePath: "./google-chrome", //path.join(__dirname, "../google-chrome"), // Path to the Chrome binary
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

      // Set HTML content
      // await page.setContent(invoiceHtml);

      // Generate PDF
      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      console.log("got buffer", pdfBuffer);

      await browser.close();
      console.log("close browser");

      return pdfBuffer;
    } catch (error) {
      console.error(error);
    }
  }

  async issueDMVICCertificate(params) {
    let phone = params.phone;
    let cert_class = params.cert_class;
    let quote_data = params.quote_data;
    let quote_id = params.quote_id;
    let quoteDB = params.quoteDB;
    let sale_data = params.sale_data;
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
        Commencingdate: this.formatDateSlash(
          sale_data.insurance_data.coverStartDate
        ),
        Expiringdate: this.formatDateSlash(
          sale_data.insurance_data.coverEndDate
        ),
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
      query.include(["quotation"]);
      let saleDB = await query.get(sale_id);

      saleDB.set("dmvic_cert", res);

      let paymentJson: any = saleDB.toJSON();
      let premiaJson = this.createPremiaJson(paymentJson, params);
      console.log("Final Mapping => ", premiaJson);
      saleDB.set("premiaJson", premiaJson);

      await saleDB.save();
    } catch (error) {
      console.error(error);
    }
  }

  createPremiaJson(newData: any, params) {
    let motorProductType = params.motorProductType;
    let certificateClass = params.certificateClass;

    function createEmptyTemplate(originalObj: any): { [key: string]: any } {
      let template: { [key: string]: any } = {};

      for (let key in originalObj) {
        if (originalObj.hasOwnProperty(key)) {
          if (Array.isArray(originalObj[key])) {
            // Create an array of empty objects with the same structure for proposals
            template[key] = originalObj[key].map((item: any) =>
              createEmptyTemplate(item)
            );
          } else if (
            typeof originalObj[key] === "object" &&
            originalObj[key] !== null
          ) {
            // Create an empty object with the same keys
            template[key] = createEmptyTemplate(originalObj[key]);
          } else {
            if (key == "prc_code") {
              template[key] = originalObj[key];
            } else {
              template[key] = "";
            }
          }
        }
      }

      return { ...originalObj };

      // return template;
    }

    // Create a deep copy of the imported quotationObj to allow mutations
    let updatedQuotationObj: any = createEmptyTemplate(this.quotationObj);
    // let updatedQuotationObj: any = {...quotationObj}
    console.log("quotationObj", updatedQuotationObj);

    // Update personal details
    updatedQuotationObj["quot_ref"] = newData.quotation.objectId || "";
    updatedQuotationObj["quot_paymt_ref"] = newData.objectId || "";
    updatedQuotationObj["quot_assr_name"] =
      newData.insurance_data.kyc.name || "";
    updatedQuotationObj["quot_assr_nic"] = newData.insurance_data.kyc.nin || "";
    updatedQuotationObj["quot_paymt_date"] = newData.createdAt || "";
    updatedQuotationObj["quot_assr_lic"] = "";
    updatedQuotationObj["quot_assr_pin"] = newData.insurance_data.kyc.tin || "";
    updatedQuotationObj["quot_assr_phone"] =
      newData.insurance_data.kyc.phone || "";
    updatedQuotationObj["quot_assr_email"] =
      newData.insurance_data.kyc.email || "";
    updatedQuotationObj["quot_assr_gender"] =
      newData.insurance_data.kyc.gender || "";
    updatedQuotationObj["quot_assr_dob"] = newData.insurance_data.kyc.dob || "";
    if (!updatedQuotationObj["quot_assr_flexi"]) {
      updatedQuotationObj["quot_assr_flexi"] = {
        quot_assr_addr: {},
      };
    }
    updatedQuotationObj["quot_assr_flexi"]["quot_assr_addr"]["pol_addr_01"] =
      newData.insurance_data.kyc.address;

    // Access proposals array
    let proposals = updatedQuotationObj["proposals"];

    if (proposals && proposals.length > 0) {
      let proposal = proposals[0];
      let newQuoteData = newData.quotation.quoteData;

      // Safeguard to ensure proposal is valid
      if (proposal) {
        proposal["prop_sr_no"] = 1;
        proposal["prop_paymt_ref"] = newData.objectId || "";
        proposal["prop_paymt_date"] = newData.createdAt || "";
        proposal["pol_quot_sys_id"] = 0;
        proposal["pol_comp_code"] =
          newData.quotation.quoteData.motorProductTypeCode || "";
        proposal["pol_divn_code"] =
          newData.insurance_data.companyDivision || "";
        proposal["pol_dept_code"] =
          newData.quotation.quoteData.motorClassCode || "";
        proposal["pol_prod_code"] =
          newData.quotation.quoteData.motorProductCode || "";
        proposal["pol_type"] =
          newData.quotation.quoteData.motorProductCode || "";
        proposal["pol_cust_code"] = "";
        proposal["pol_assr_code"] = "";
        // Update proposal dates
        proposal["pol_fm_dt"] = newData.insurance_data.coverStartDate || "";
        proposal["pol_to_dt"] = newData.insurance_data.coverEndDate || "";

        // Update policy info
        proposal["pol_quot_no"] = newData.quotation.objectId + "-" + 1 || "";
        proposal["pol_dflt_si_curr_code"] = "KES"; // Assuming currency remains the same
        proposal["pol_prem_curr_code"] = "KES";

        proposal["pol_flexi"]["payment_mode_code"]["pol_flex_10"] = "4";
        proposal["pol_flexi"]["payment_mode_desc"][
          "pol_flex_18"
        ] = `Flutterwave - ${newData.txRef || ""} - ${newData.amount || 0}`;
        proposal["pol_flexi"]["cover_type_code"]["pol_flex_14"] =
          newData.quotation.quoteData.motorClassCode || "";
        proposal["pol_flexi"]["cover_type_desc"]["pol_flex_16"] =
          this.getAnyKeyValue(
            newData.quotation.quoteData.motorClassCode,
            "name",
            motorProductType
          );
        proposal["pol_flexi"]["issued_at_code"]["pol_flex_01"] = 118;
        proposal["pol_flexi"]["issued_at_desc"]["pol_flex_17"] =
          "Portal Policies";
        proposal["pol_flexi"]["prev_policy_no"]["pol_flex_20"] = "";
        proposal["pol_flexi"]["territory"]["pol_flex_02"] = "KENYA";
        proposal["pol_flexi"]["broker_risk_note_no"]["pol_flex_08"] = "";

        proposal["proposalsections"][0]["sec_sr_no"] = "1";
        proposal["proposalsections"][0]["psec_sec_code"] =
          newData.quotation.quoteData.motorproductSectAssCode || "";

        // Access proposal sections and risks
        let proposalRisk =
          proposal["proposalsections"]?.[0]?.["proposalrisks"]?.[0];
        let vehicleData = newData.insurance_data.vehicle;

        if (proposalRisk && vehicleData) {
          // Update vehicle details
          proposalRisk["prai_flexi"]["vehicle_cover_type"]["prai_code_21"] =
            newData.quotation.quoteData.motorProductTypeCode || "";
          proposalRisk["prai_flexi"]["vehicle_make"]["prai_code_04"] =
            newQuoteData.vehicleMake || "";
          proposalRisk["prai_flexi"]["vehicle_model"]["prai_code_05"] =
            newQuoteData.vehicleModel || "";
          proposalRisk["prai_flexi"]["vehicle_body_type"]["prai_code_01"] =
            vehicleData.bodyType || "";
          proposalRisk["prai_flexi"]["vehicle_reg_no"]["prai_data_03"] =
            newQuoteData.vehicleRegNumber || "";
          proposalRisk["prai_flexi"]["vehicle_chassis_no"]["prai_data_01"] =
            vehicleData.chasisNumber || "";
          proposalRisk["prai_flexi"]["vehicle_engine_no"]["prai_data_02"] =
            vehicleData.EngineNumber || "";
          proposalRisk["prai_flexi"]["vehicle_yom"]["prai_num_01"] =
            newQuoteData.yearOfManufacture || 0;
          proposalRisk["prai_flexi"]["vehicle_value"]["prai_num_02"] =
            newQuoteData.sumInsured || 0;
          proposalRisk["prai_flexi"]["vehicle_cc"]["prai_num_04"] =
            newData.insurance_data.vehicle.cc || "";
          proposalRisk["prai_flexi"]["seating_capacity"]["prai_num_09"] =
            newData.insurance_data.vehicle.seatingCapacity || "";
          proposalRisk["prai_flexi"]["num_pax"]["prai_num_03"] =
            newData.insurance_data.vehicle.numPassengers || "";
          proposalRisk["prai_flexi"]["vehicle_tonnage"]["prai_num_14"] =
            newData.insurance_data.vehicle.tonnage || "";

          // Update cover details in proposal
          proposalRisk["proposalcovers"]?.forEach((cover: any) => {
            switch (cover["prc_code"]) {
              case "3101": // Own Damage
                cover.prc_desc = "Own Damage";
                cover.cvr_sr_no = 1;
                cover["prc_rate"] = newQuoteData.excessProtectorBenefit || 0;
                cover.prc_rate_per = 1;
                cover["prc_si_fc"] = newQuoteData.sumInsured || 0;
                cover["prc_prem_fc"] = newQuoteData.excessProtectorBenefit || 0;
                break;
              case "3176": // Third Party Only
                cover.prc_desc = "Third Party Only";
                cover.cvr_sr_no = 2;
                cover["prc_rate"] = 0;
                cover.prc_rate_per = 1;
                cover["prc_si_fc"] = newQuoteData.sumInsured;
                cover["prc_prem_fc"] = 0;
                break;
              case "3109": // Windscreen
                cover.prc_desc = "Windscreen";
                cover.cvr_sr_no = 3;
                cover["prc_rate"] = newQuoteData.windScreenBenefit || 0;
                cover.prc_rate_per = 1;
                cover["prc_si_fc"] = newQuoteData.sumInsured || 0;
                cover["prc_prem_fc"] = newQuoteData.windScreenBenefit || 0;
                break;
              case "3110": // Radio Cassette
                cover.prc_desc = "Radio Cassette";
                cover.cvr_sr_no = 4;
                cover["prc_rate"] = newQuoteData.radioCassetteBenefit || 0;
                cover.prc_rate_per = 1;
                cover["prc_si_fc"] = newQuoteData.sumInsured;
                cover["prc_prem_fc"] = newQuoteData.radioCassetteBenefit || 0;
                break;
              case "3198": // Excess Protector
                cover.prc_desc = "Excess Protector";
                cover.cvr_sr_no = 5;
                cover["prc_rate"] = newQuoteData.excessProtectorBenefit || 0;
                cover.prc_rate_per = 1;
                cover["prc_si_fc"] = newQuoteData.sumInsured;
                cover["prc_prem_fc"] = newQuoteData.excessProtectorBenefit || 0;
                break;
              case "3199": // Political Violence and Terrorism
                cover.prc_desc = "Political Violence and Terrorism";
                cover.cvr_sr_no = 6;
                cover["prc_rate"] = newQuoteData.pvtBenefit || 0;
                cover.prc_rate_per = 1;
                cover["prc_si_fc"] = newQuoteData.sumInsured || 0;
                cover["prc_prem_fc"] = newQuoteData.pvtBenefit || 0;
                break;
            }
          });

          // Update Certificate details
          proposalRisk["proposalmotorcerts"][0]["cert_sr_no"] = 1;
          proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["cert_mode"][
            "prai_data_08"
          ] = "02";
          proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["cert_type"][
            "prai_code_14"
          ] = certificateClass || "";
          proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["book_id"][
            "prai_data_09"
          ] = "DIGI_CERT";
          if (
            newData.dmvic_cert.callbackObj &&
            newData.dmvic_cert.callbackObj.issueCertificate
          ) {
            proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["cert_num"][
              "prai_data_05"
            ] = newData.dmvic_cert.callbackObj.issueCertificate.actualCNo;
          }

          proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["cert_fm_dt"][
            "prai_date_21"
          ] = newData.insurance_data.coverStartDate || "";
          proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["cert_to_dt"][
            "prai_date_22"
          ] = newData.insurance_data.coverEndDate || "";
          proposalRisk["proposalmotorcerts"][0]["prai_flexi"]["cert_name"][
            "prai_data_10"
          ] = "";
        }
      }
    }

    delete updatedQuotationObj.default;

    // Return updated object
    return updatedQuotationObj;
  }

  getAnyKeyValue(
    inHandValue: any,
    propertyOfInterest: keyof any,
    objectInQuestion: any
  ) {
    const obj = objectInQuestion.find(
      (pair: any) => pair.inHandValue === inHandValue
    );
    return obj ? obj[propertyOfInterest] : undefined;
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
      let host = params.host; // "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io"; // Use an environment variable or default to 'localhost'

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

      // this.issueDMVICCertificate(params);

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

              let sale_id = "A4QmZ1Vgel";
              let host =
                "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io";
              let letter_url = `${host}/valuation-letter/${sale_id}`;
              let receipt_url = `${host}/receipt/${sale_id}`;
              let debitnote_url = `${host}/debitnote/${sale_id}`;
              let policyschedule_url = `${host}/policyschedule/${sale_id}`;

              let valuationLetterBuffer = await this.generateDocument(
                letter_url
              );
              let receiptBuffer = await this.generateDocument(receipt_url);
              let debitNoteBuffer = await this.generateDocument(debitnote_url);
              let policyScheduleBuffer = await this.generateDocument(
                policyschedule_url
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
                  },
                  {
                    filename: `Receipt - ${today}.pdf`,
                    content: receiptBuffer,
                  },
                  {
                    filename: `Valuation Letter - ${today}.pdf`,
                    content: valuationLetterBuffer,
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

              //send valuation request
              let valuation_request_res = await Parse.Cloud.run(
                "valuation_request",
                {
                  sale_id: sale_id,
                }
              );
              console.log("valuation request sent", valuation_request_res);
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
        const response = await axios.get(tokenUrl, {
          headers: {
            Authorization:
              "Basic S3FUNDk2V1c1V09LMmxjT3AwdnRzQjZxVWFYaHl0UXhwbUdzS2FWS1kza0xNTzA4OlVyaU1lT0NQamVlMDNuaFo0SDZhTlZsNkU0ZWJ2TEExQWNWbnFnRnUxb08yZmJ3c0FkSU1vN2VTWEdXMmRERWM=",
          },
        });

        let tokenData = response.data;

        // console.log("access token", response.data);
        tokenData = {
          access_token: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjVCQjRFNjE4NzdGNTMxRUJDQUZCOEIwMEFGRjkzMkU5QkI2Qjc0NjQiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiSU5TQVBJVVNFUiIsInByaW1hcnlzaWQiOiI4MUI4RkJBMi0yRjA3LTRDRjAtOEZEQi0zQzYwMDE1ODMyNUUiLCJwcmltYXJ5Z3JvdXBzaWQiOiIyNiIsImxvZ2luaGlzdG9yeSI6IjQyNTY1NiIsIm5iZiI6MTcyODI5MTYwNiwiZXhwIjoxNzI4ODk2NDA2LCJpYXQiOjE3MjgyOTE2MDYsImlzcyI6Imh0dHBzOi8vdWF0LWFwaS5kbXZpYy5jb20iLCJhdWQiOiJodHRwczovL3VhdC1hcGkuZG12aWMuY29tIn0.hSOevMz49gcHc68DRft2XGVA82ExrbFC92mVMgPc5sBnY3M4mEJy3g7rjtaCFV46lN-h_1qljn38KbH4iqRlbkAfuyKmfkXxJ725jRpIYUShNcNyFtBx7sI9IUBmdW_fwJRjQHK8KErPGjDBSAFSHmXn7_YFVSxSle0fMZC_V775wuzqyYty77kryf9io8VigMQnui9QmULVDEueopQ8fxcqO_uO4zKSF_Xcuip5xWNQ43okaWFWGXc-f8AoymCsIJEE2suOw9IwDxo8NBEnZTHmr9lpSQCqu6b-lLWS3GfBnBjSghwQXREnkofLZAcaZXzpgJ6KHVII0ga5W2oRXQ`,
        };

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

    Parse.Cloud.define("valuation_request", async (request) => {
      let params = request.params;
      let baseUrl = "";
      let tokenUrl = "";
      let token = "";
      let sale_id = params.sale_id;

      try {
        let query = new Parse.Query("JazkeSale");
        query.include(["quotation"]);
        let saleDB = await query.get(sale_id);
        let insurance_data = saleDB.get("insurance_data");
        let kyc = insurance_data.kyc;
        let vehicle = insurance_data.vehicle;
        let valuer = insurance_data.vehicle.valuer;
        saleDB.set("valuer", valuer);

        if (valuer == "SOLVIT LIMITED") {
          baseUrl = "https://solvit.staging9.com";
          tokenUrl = `${baseUrl}/api/insurance-login`;
          const data = {
            email: "ahabweemma@gmail.com",
            password: "5VWXhpvg7@62J",
          };
          const tokenResponse = axios.post(tokenUrl, data);
          let result = tokenResponse.data;
          console.log("Response:", result);
          if (result && result.token) {
            token = result.token;
            console.log("solvit token:", token);

            let nameParts = kyc.name.split(" ");

            let endpoint = `${baseUrl}/api/request/insurance-initiate-request`;
            let post_body = {
              customerMobile: kyc.phone,
              vehicleRegNo: vehicle.registrationNumber,
              firstName: nameParts[0],
              lastName: nameParts[1],
              email: kyc.email,
              type: "2",
              siteType: "2",
              insuranceCompanyRequestId: "a0T5E000002O1UYUA0",
              paymentType: "1",
              autoAssign: "0",
              latitude: "",
              longitude: "",
            };

            const response = await axios.post(endpoint, post_body, {
              headers: {
                "Content-Type": "application/json",
                // ClientID: "99EA05B9-7515-4338-A7A2-B8515BD712E8",
                Authorization: token,
              },
            });
            let valuationResponse = response.data;
            console.log("Response:", valuationResponse);

            saleDB.set("valuation_req_result", valuationResponse);
            saleDB.save();
            return valuationResponse;
          }
        } else if (valuer == "REGENT VALUERS") {
          let endpoint = `https://mobi.regentautovaluers.co.ke/app-api/jubilee/reg-request/`;
          let post_body = {
            reg_no: vehicle.registrationNumber,
            username: "jubilee",
            api_key: "1acc641a-659f-476f-9de3-b04350021921",
          };

          const response = await axios.post(endpoint, post_body, {
            headers: {
              "Content-Type": "application/json",
              // ClientID: "99EA05B9-7515-4338-A7A2-B8515BD712E8",
              // Authorization: token,
            },
          });
          let valuationResponse = response.data;
          console.log("Response:", valuationResponse);

          saleDB.set("valuation_req_result", valuationResponse);
          saleDB.save();
          return valuationResponse;
        }
      } catch (error) {
        console.error(error);
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
