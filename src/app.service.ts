import { Injectable } from "@nestjs/common";
const nodemailer = require("nodemailer");
// let unirest = require("unirest");
const axios = require("axios");

import { Utils } from "./utils";
const puppeteer = require("puppeteer");
const qs = require("qs");

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

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
    let certificateClass = params.certificateClass;
    let quote_data = params.quote_data;
    let quote_id = params.quote_id;
    let quoteDB = params.quoteDB;
    let sale_data = params.sale_data;
    let sale_id = params.sale_id;
    let agent_email = params.agent_email;
    let client_email = params.client_email;
    let client = params.client || {};
    let endpoint = "Integration/IssuanceTypeACertificate";
    let cert_class = certificateClass.cert_class;

    let vehicle_type;
    let Licensedtocarry;

    if (cert_class == "Class A") {
      endpoint = "Integration/IssuanceTypeACertificate";
      Licensedtocarry = sale_data.insurance_data.vehicle.numPassengers;
    } else if (cert_class == "Class B") {
      vehicle_type = 1;
      Licensedtocarry = sale_data.insurance_data.vehicle.numPassengers;
      endpoint = "Integration/IssuanceTypeBCertificate";
    } else if (cert_class == "Class C") {
      endpoint = "Integration/IssuanceTypeCCertificate";
    } else if (cert_class == "Class D") {
      endpoint = "Integration/IssuanceTypeDCertificate";
    }

    console.log("certficate class", cert_class);
    console.log("endpoint", endpoint);

    let cert_params = {
      endpoint: endpoint,
      body: {
        IntermediaryIRANumber: "",
        vehicle_type: vehicle_type,
        Licensedtocarry: Licensedtocarry,
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
        Registrationnumber: sale_data.insurance_data.vehicle.registrationNumber,
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
      this.registerError(error);
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

  registerError(error) {
    let Err = Parse.Object.extend("JazkeError");
    let err = new Err();
    err.set("response", error.response);
    err.set("message", error.message);
    // err.set("json", error.toJSON());
    err.save();
    // console.log('error json', )
  }

  async registerAgentInPremia(params) {
    async function activateAccount(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
          },
        });

        console.log("Account activated successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error activating account:",
          error.response?.data || error.message
        );
      }
    }

    try {
      const url =
        "https://jazk-api-app2.victoriousriver-e1958513.northeurope.azurecontainerapps.io/auth/register_agent";

      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      const data = {
        password: "string", //this.utils.stringToHex(params.cust_code),
        email: params.email,
        phone: params.phone,
        cust_code: params.cust_code,
      };

      const response = await axios.post(url, data, { headers });
      console.log("Response:", response.data);
      let d = response.data;
      if (
        d &&
        d.detail == "Agent already registered as portal user. Please log in"
      ) {
        await this.delay(1000);
        //   {
        //     "detail": "Agent already registered as portal user. Please log in"
        // }
        d.login_result = await this.loginAgentInPremia({
          username: data.phone,
        });

        return d;
      } else if (
        d &&
        d.detail ==
          "Your details do not match any of our records. Please contact the Agents Administrator"
      ) {

        return d;
      } else if (d && d.activation_url) {
        // Call the function with the provided token
        d.activation_result = await activateAccount(d.activation_url);
        await this.delay(1000);
        d.login_result = await this.loginAgentInPremia({
          username: data.phone,
        });
      }

      return d;
      //   {
      //     "message": "Portal user registered Please send activation email",
      //     "activation_url": "http://jazk-api-app2.victoriousriver-e1958513.northeurope.azurecontainerapps.io/auth/activate?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzAxMzkxNzYsInN1YiI6IjA3MjIyMDczMDQifQ._lO1WvHtDcBiikL24QuHGtJ1AYhYRK3vjH8IqfnImO8"
      // }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async loginAgentInPremia(params) {
    try {
      const url =
        "https://jazk-api-app2.victoriousriver-e1958513.northeurope.azurecontainerapps.io/auth/login/access-token";

      const headers = {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };

      // Form data as an object
      const data = {
        grant_type: "",
        username: params.username,
        password: "string", //this.utils.stringToHex(params.cust_code),
        scope: "",
        client_id: "",
        client_secret: "",
      };

      // Convert form data to x-www-form-urlencoded format
      const formData = qs.stringify(data);

      const response = await axios.post(url, formData, { headers });

      console.log("Response:", response.data);
      let d = response.data;
      //   {
      //     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzAxMzg5NTcsInN1YiI6IjY0In0.XFJ1wdt2iQWPp6U9rhMgA6dSsF_JnMKsof8w8ZKU50k",
      //     "token_type": "bearer"
      // }

      //   {
      //     "detail": "Incorrect email or password"
      // }

      return d;
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async createQuoteInPremia(params) {
    try {
      const url =
        "https://jazk-api-app2.victoriousriver-e1958513.northeurope.azurecontainerapps.io/quotes/quote";

      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${params.access_token}`,
        "Content-Type": "application/json",
      };

      const data = params.payload;

      const response = await axios.post(url, data, { headers });

      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
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

              // let sale_id = "A4QmZ1Vgel";
              let host =
                "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io";
              let letter_url = `${host}/valuation-letter/${sale_id}`;
              let receipt_url = `${host}/receipt/${sale_id}`;
              let debitnote_url = `${host}/debitnote/${sale_id}`;
              let policyschedule_url = `${host}/policyschedule/${sale_id}`;
              receipt_url =
                "https://jazk-web-ca.victoriousriver-e1958513.northeurope.azurecontainerapps.io/receipt/fUsfMniQEU";

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
        this.registerError(error);
        return String(error).toString();
      }
    });

    Parse.Cloud.define("sendMail", async (request) => {
      let params = request.params;
      return await this.utils.sendEmail(params);
    });

    Parse.Cloud.define("registerAgentPremia", async (request) => {
      let params = request.params;
      return await this.registerAgentInPremia(params);
    });

    Parse.Cloud.define("loginAgentPremia", async (request) => {
      let params = request.params;
      return await this.loginAgentInPremia(params);
    });


    Parse.Cloud.define("createPolicyInPremia", async (request) => {
      let params = request.params;
      return await this.loginAgentInPremia(params);
    });

    Parse.Cloud.define("dmvic_request", async (request) => {
      let params = request.params;
      let baseUrl = "https://uat-api.dmvic.com/api/v5";
      // let tokenUrl = "http://10.158.2.21:8080/api/get-aki-token";
      let tokenUrl = "http://10.212.0.6:8080/api/get-aki-token";

      let endpoint = params.endpoint;
      let post_body = params.body;

      const login = async () => {
        try {
          const url = "https://uat-api.dmvic.com/api/V1/Account/Login";

          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVCQjRFNjE4NzdGNTMxRUJDQUZCOEIwMEFGRjkzMkU5QkI2Qjc0NjQiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiSU5TQVBJVVNFUiIsInByaW1hcnlzaWQiOiI4MUI4RkJBMi0yRjA3LTRDRjAtOEZEQi0zQzYwMDE1ODMyNUUiLCJwcmltYXJ5Z3JvdXBzaWQiOiIyNiIsImxvZ2luaGlzdG9yeSI6IjgwMTc5IiwibmJmIjoxNjk5MjUwNDA0LCJleHAiOjE2OTk4NTUyMDQsImlhdCI6MTY5OTI1MDQwNCwiaXNzIjoiaHR0cHM6Ly91YXQtbW90b3IuZG12aWMuY29tIiwiYXVkIjoiaHR0cHM6Ly91YXQtbW90b3IuZG12aWMuY29tIn0.ua_ZLBBL_VDRscLC-pE9Mku_rHko72eMqWwR4itzGUreGhpRAE1mz7Lx9lRf5hdcsZK8bmmw5aAL-N9mbusI73ex28oUJnBjt4_6XaE-gd_SjCFnIp4k2xueIYdYzKnNCULegECvk7MAw9j_zVl7nA8H2JpFan8RLi0C3rDkgxOgUgO7LcWmcpx5IjGejy-Mi7hjV5n6RP80F-HTJHnaIEaopsc2-DIq2HKHQcRV4IfJZoKbJrbf29N_ndemVqsa20GTFANFk5-ww31JPnbAJ-kb22gWPd3E6mzjnaJaGWRV88Bxu2lBkNFsh8EAQSitR58aiu_73XpgJma5VVE3QQ",
          };

          const data = {
            Username: "jubileeapiuser@dmvic.info",
            Password: "J$U!leeU$R@",
            ClientID: "99EA05B9-7515-4338-A7A2-B8515BD712E8",
          };

          const response = await axios.post(url, data, { headers });

          console.log("Response:", response.data);
          return response.data;
        } catch (error) {
          if (error.response) {
            console.error("Error Response:", error.response.data);
          } else {
            console.error("Error:", error.message);
          }
        }
      };

      // Main function to get a valid token (either from Parse or by logging in)
      async function getToken() {
        let tokenData = await getCachedToken(); // Retrieve cached token from Parse

        if (tokenData && !isTokenExpired(tokenData.expires)) {
          console.log("Using cached valid token from Parse.");
          return tokenData;
        }

        console.log("Cached token expired or not found. Logging in...");
        tokenData = await login(); // Fetch new token from server
        await cacheToken(tokenData); // Cache the new token in Parse

        return tokenData;
      }

      // Helper function to check if the token is expired
      function isTokenExpired(expirationTime) {
        const now = new Date();
        const expiresAt = new Date(expirationTime);
        return now >= expiresAt;
      }

      // Cache the token in Parse Server
      async function cacheToken(tokenData) {
        const Token = Parse.Object.extend("DMVICToken"); // 'Token' class in Parse
        const query = new Parse.Query(Token);

        try {
          const existingToken = await query.first(); // Check if a token already exists
          let tokenObject;

          if (existingToken) {
            console.log("Updating existing token in Parse.");
            tokenObject = existingToken;
          } else {
            console.log("Creating new token entry in Parse.");
            tokenObject = new Token();
          }

          tokenObject.set("token", tokenData.token);
          tokenObject.set("expires", tokenData.expires);
          tokenObject.set("issueAt", tokenData.issueAt);
          tokenObject.set("loginUserId", tokenData.loginUserId);
          tokenObject.set("data", tokenData);

          await tokenObject.save();
          console.log("Token cached successfully in Parse.");
        } catch (error) {
          console.error("Error caching token in Parse:", error.message);
        }
      }

      // Retrieve cached token from Parse Server
      async function getCachedToken() {
        const Token = Parse.Object.extend("Token"); // 'Token' class in Parse
        const query = new Parse.Query(Token);

        try {
          const tokenObject = await query.first(); // Get the first token entry
          if (tokenObject) {
            return {
              token: tokenObject.get("token"),
              expires: tokenObject.get("expires"),
              issueAt: tokenObject.get("issueAt"),
              loginUserId: tokenObject.get("loginUserId"),
            };
          }
          return null;
        } catch (error) {
          console.error("Error retrieving token from Parse:", error.message);
          return null;
        }
      }

      let tokenData = await getToken();

      //   let tokenData = {
      //     "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVCQjRFNjE4NzdGNTMxRUJDQUZCOEIwMEFGRjkzMkU5QkI2Qjc0NjQiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiSU5TQVBJVVNFUiIsInByaW1hcnlzaWQiOiI4MUI4RkJBMi0yRjA3LTRDRjAtOEZEQi0zQzYwMDE1ODMyNUUiLCJwcmltYXJ5Z3JvdXBzaWQiOiIyNiIsImxvZ2luaGlzdG9yeSI6IjQ3NTQ1OCIsIm5iZiI6MTcyODkwNzk0OSwiZXhwIjoxNzI5NTEyNzQ5LCJpYXQiOjE3Mjg5MDc5NDksImlzcyI6Imh0dHBzOi8vdWF0LWFwaS5kbXZpYy5jb20iLCJhdWQiOiJodHRwczovL3VhdC1hcGkuZG12aWMuY29tIn0.tY4dvbA_tPnrGJfVv2r1lwIkinYWnCMWyXMrJ0r8s4KSeqNn5vT-QeEznzIhx0rcbZoAlt28lvacGOD9WnQfjkKgqadSk5oy1GllA9dIfzKleHKtJM1OkpDgwA2OGU6tmEgRGBtu_BM4FcsRO7XUmq9n8Tcu53XtKVhDj7BgDGy3OdqmhFGCZt-GzTywOMTEowu0vgZz9CekOZjsFrAccHTs_hmpH7Muw2HlqQpu7k3pIqdOkb-7WQrhY-7Z9Zl2kVit1WHuFcJyvvajaWAExJ-dS3FZrVujLDfai9qNtWmrOfZtT6LlWrikSX37HUCiephs_vFuIziCARE3dxR1pg",
      //     "loginUserId": "81B8FBA2-2F07-4CF0-8FDB-3C600158325E",
      //     "issueAt": "2024-10-14T12:07:29.4096404Z",
      //     "expires": "2024-10-21T12:12:29.390373Z",
      //     "code": 1,
      //     "LoginHistoryId": 475458,
      //     "firstName": "Jubilee",
      //     "lastName": "apiuser",
      //     "loggedinEntityId": 26,
      //     "ApimSubscriptionKey": null,
      //     "IndustryTypeId": 2
      // }

      try {
        // const response = await axios.get(tokenUrl, {
        //   headers: {
        //     Authorization:
        //       "Basic S3FUNDk2V1c1V09LMmxjT3AwdnRzQjZxVWFYaHl0UXhwbUdzS2FWS1kza0xNTzA4OlVyaU1lT0NQamVlMDNuaFo0SDZhTlZsNkU0ZWJ2TEExQWNWbnFnRnUxb08yZmJ3c0FkSU1vN2VTWEdXMmRERWM=",
        //   },
        // });
        // let tokenData = response.data;
        // console.log("access token", response.data);

        // let tokenData = {
        //   access_token: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjVCQjRFNjE4NzdGNTMxRUJDQUZCOEIwMEFGRjkzMkU5QkI2Qjc0NjQiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiSU5TQVBJVVNFUiIsInByaW1hcnlzaWQiOiI4MUI4RkJBMi0yRjA3LTRDRjAtOEZEQi0zQzYwMDE1ODMyNUUiLCJwcmltYXJ5Z3JvdXBzaWQiOiIyNiIsImxvZ2luaGlzdG9yeSI6IjQzMTY3NyIsIm5iZiI6MTcyODQ2NzM2MiwiZXhwIjoxNzI5MDcyMTYxLCJpYXQiOjE3Mjg0NjczNjIsImlzcyI6Imh0dHBzOi8vdWF0LWFwaS5kbXZpYy5jb20iLCJhdWQiOiJodHRwczovL3VhdC1hcGkuZG12aWMuY29tIn0.eRcZa5eD6YBmnKMnUm8WTvI0RulhrUgMIVuuidBWodUZux0C_8flXuGUghl-F3qlozS3zGB7giz8oq1sUmGKmLA5LB1pkjW_RHBqodXZU5RVWqNBP6rCUsg5nZ87r5WNXP1GfSIgJRXJw-4JzU-nEpi6yKRdOJMAI1cvS55sELS9QxDjyt5JLYFPUoxEopYIhPCxC23tDBtQi5D63h7DOyOB5lIf2e2pT3Mk79bgGDCz2gjH7JX4OksYU3resMOv_4qx7O59y4NPzMbhzzZFp6ZlTC0_tQPyKR4BYb_japu1mnp-M8BhU9-AxhJoYZohuNLzaDnl1J2F5UhHZCaJZA`,
        // };

        if (tokenData && tokenData.token) {
          const response = await axios.post(
            `${baseUrl}/${endpoint}`,
            post_body,

            {
              headers: {
                "Content-Type": "application/json",
                ClientID: "99EA05B9-7515-4338-A7A2-B8515BD712E8",
                Authorization: `Bearer ${tokenData.token}`,
              },
            }
          );
          console.log(response.data);
          return response.data;
        }
      } catch (error) {
        console.error("Request failed:", error);
        this.registerError(error);
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

        console.log("valuer is", valuer);

        if (valuer == "SOLVIT LIMITED") {
          console.log("sending solvit valuation request");
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
            console.log("Solvit valuation Response:", valuationResponse);

            saleDB.set("valuation_req_result", valuationResponse);
            saleDB.save();
            return valuationResponse;
          }
        } else if (valuer == "REGENT VALUERS") {
          console.log("sending regent valuation request");
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
          console.log("Regent valuation Response:", valuationResponse);

          saleDB.set("valuation_req_result", valuationResponse);
          saleDB.save();
          return valuationResponse;
        }
      } catch (error) {
        this.registerError(error);
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
        this.registerError(error);
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
