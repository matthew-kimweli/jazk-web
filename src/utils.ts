var nodemailer = require("nodemailer");
const axios = require("axios");

export class Utils {
  // BASE_URL=https://89kj1e.api.infobip.com
  // APP_KEY=a6ec5d4ba09701375f50783beecb490d-59a3338d-9898-4e81-b0aa-f4a303f131b8
  // EMAIL_VALIDATION_ENDPOINT=https://89kj1e.api.infobip.com/email/2/validation
  // SEND_EMAIL_ENDPOINT=https://89kj1e.api.infobip.com/email/3/send
  // EMAIL_REPORTS_ENDPOINT=https://89kj1e.api.infobip.com/email/1/reports

  // Portal credentials
  // Username: ADMIN_General
  // Password: Geeks@2022

  // Documentation link -> https://www.infobip.com/docs/api

  async sendEmail(params) {
    if (!params.subject) {
      return;
    }

    console.log("sendig=ng email");

    let transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail', 'yahoo', etc.
      auth: {
        user: "congounlocked@gmail.com",
        pass: "qywswupsbdqsntuw",
      },
    });

    var from = "congounlocked@gmail.com"; //params.from || 'Quotations JAZUG';
    var to = params.to;
    var cc = params.cc;
    var subject = params.subject;
    var text = params.text;
    var attachments = params.attachments;
    var html = params.html;

    var mailOptions: any = {
      from: from, //'"Fred Foo ðŸ‘»" <foo@blurdybloop.com>', // sender address
      to: to, //'ate@gmail.com, baz@blurdybloop.com', // list of receivers
      cc: cc,
      subject: subject, //'Hello âœ”', // Subject line
      text: text, //'Hello world ?', // plain text body
      html: html, //'<b>Hello world ?</b>' // html body
    };
    if (html) {
      mailOptions.text = undefined;
      mailOptions.html = html;
    }

    //   {   // use URL as an attachment
    //     filename: 'license.txt',
    //     path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
    // },

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent", mailOptions);
      return { success: true, message: "Email Sent" };
    } catch (error) {
      // this.sendEmailBackup(params)
      console.error(error);
      return {
        success: false,
        title: "Error, Email Not Sent.",
        message:
          "Client network socket disconnected before secure TLS connection was established",
      };
    }
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async sendEmailInfobip(params) {
    function toArray(input) {
      if (typeof input === "string") {
        // If the input is a string and contains a comma, split it using commas as delimiters
        if (input.includes(",")) {
          return input.split(",").map((item) => item.trim());
        } else {
          // If the input is a string without commas, treat it as a single item in an array
          return [input.trim()];
        }
      } else if (Array.isArray(input)) {
        // If the input is already an array, return it as is
        return input;
      } else {
        // If the input is neither a string nor an array, return an empty array
        return [];
      }
    }

    // Set up InfoBip API credentials
    const apiKey =
      "App a6ec5d4ba09701375f50783beecb490d-59a3338d-9898-4e81-b0aa-f4a303f131b8";
    const apiBaseURL = "https://89kj1e.api.infobip.com";

    const SENDER_EMAIL = params.from || "noreply@mails-ke.jubilee-allianz.com";
    const RECIPIENT_EMAILS = toArray(params.to);
    const CC_EMAILS = toArray(params.cc);
    const EMAIL_SUBJECT = params.subject;
    const EMAIL_TEXT = params.text;

    var attachments = params.attachments;
    let REMOTE_ATTACHMENTS: any = [];
    if (attachments && attachments.length) {
      for (const file of attachments) {
        REMOTE_ATTACHMENTS.push({ url: file.path, name: file.filename });
      }
    }

    console.log("to address:", RECIPIENT_EMAILS);

    const formData = new FormData();
    formData.append("from", SENDER_EMAIL);
    formData.append("subject", EMAIL_SUBJECT);
    formData.append("text", EMAIL_TEXT);

    for (const t of RECIPIENT_EMAILS) {
      formData.append("to", t);
    }
    for (const t of CC_EMAILS) {
      formData.append("cc", t);
    }

    const fetchAndAppendAttachments = async () => {
      for (const { url, name } of REMOTE_ATTACHMENTS) {
        const response = await axios.get(url, { responseType: "stream" });
        // formData.append('attachment', response.data, { filename: filename });
        formData.append("attachment", response.data, name);
      }
    };

    try {
      await fetchAndAppendAttachments();

      // const headers = { Authorization: apiKey, ...formData.getHeaders() };
      const headers = { Authorization: apiKey };
      const response = await axios.post(
        `${apiBaseURL}/email/3/send`,
        formData,
        { headers }
      );
      console.log("Status Code:", response.status);
      console.log(JSON.stringify(response.data));
      return { success: true, message: "Email Sent via Infobip" };
    } catch (error) {
      console.error(error.response.data.requestError);
      // console.error("Error", error);
      return {
        success: false,
        title: "Infobip - Error, Email Not Sent.",
        message:
          "Client network socket disconnected before secure TLS connection was established",
      };
    }
  }

  sendInfoBipSMS(text, phone) {
    // Set up InfoBip API credentials
    const apiKey =
      "a6ec5d4ba09701375f50783beecb490d-59a3338d-9898-4e81-b0aa-f4a303f131b8";
    const apiBaseURL = "https://89kj1e.api.infobip.com";

    // Set up the SMS message details
    const message = {
      from: "JALLIANZ",
      to: phone,
      destinations: [{ to: phone, messageId: Date.now() }],
      text: text,
    };

    const postData = {
      messages: [message],
    };

    // Send the SMS message
    axios
      .post(`${apiBaseURL}/sms/2/text/advanced`, postData, {
        headers: {
          Authorization: `App ${apiKey}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("SMS sent successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error sending SMS:",
          JSON.stringify(error.response.data)
        );
      });
  }
}
