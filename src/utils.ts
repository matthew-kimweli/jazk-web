const axios = require('axios');
var nodemailer = require('nodemailer');
const FormData = require('form-data');


const credentials = {
    apiKey: 'debc50d736bd4848aa3a37818c2a16f757230a5d66a3d4ebf5a121e8b64c26f8',
    username: 'JAZUG_SMS',      // use 'sandbox' for development in the test environment
};



const Africastalking = require('africastalking')(credentials);



export class Utils {

    async sendEmail(params) {

        if (!params.subject) {
            return;
        }


        // create reusable transporter object using the default SMTP transport


        console.log("sendig=ng email")

        // var transporter = nodemailer.createTransport({
        //     host: 'congounlocked.com',
        //     port: 465,

        //     secure: true,
        //     auth: {
        //         user: 'app@congounlocked.com',
        //         pass: '?dPtHW7vz_dLP9v'
        //     },
        //     tls: {
        //         rejectUnauthorized: true
        //     },
        // });

        //         SMTP Settings

        // Server Name: smtp.office365.com

        // Port : 587

        // Sender Name (If needed): Quotations JAZUG

        // Sender Email: quotations_jazug@jubileeuganda.com

        // Secure connection Protocol: START/TLS

        // Username: quotations_jazug@jubileeuganda.com

        // Password : “Please reach to for it”
        //         host: "smtp.live.com",
        // port: 587,
        // requiresAuth: true,
        // domains: ["hotmail.com", "outlook.com"],
        // tls: {ciphers:'SSLv3'}



        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(
            {
                service: 'Outlook365',
                auth: {
                    user: 'sales@jubileeallianz.co.ug',
                    pass: "@llianz-12345"
                    // user: 'quotations_jazug@jubileeuganda.com',
                    // pass: "@llianz-123"
                    // user : 'mukasa@jubileeuganda.com',
                    // pass : "Ell@te#198678"
                },

                // name:'Quotations JAZUG',


                // service: 'gmail',
                // auth: {
                //     user: 'congounlocked@gmail.com',
                //     // pass: '?dPtHW7vz_dLP9v'
                //     pass: 'qywswupsbdqsntuw'

                //     // https://accounts.google.com/b/0/displayunlockcaptcha
                //     // https://www.google.com/settings/security/lesssecureapps

                // }
            });


        var from = 'sales@jubileeallianz.co.ug';//params.from || 'Quotations JAZUG';
        // var from = 'quotations_jazug@jubileeuganda.com';//params.from || 'Quotations JAZUG';
        var to = params.to;
        var cc = params.cc;
        var subject = params.subject;
        var text = params.text;
        var attachments = params.attachments;
        var html = params.html;

        var mailOptions: any = {
            from: from, //'"Fred Foo ðŸ‘»" <foo@blurdybloop.com>', // sender address
            to: to,//'ate@gmail.com, baz@blurdybloop.com', // list of receivers
            cc: cc,
            subject: subject,//'Hello âœ”', // Subject line
            text: text,//'Hello world ?', // plain text body
            html: html //'<b>Hello world ?</b>' // html body
        };
        if (html) {
            mailOptions.text = undefined
            mailOptions.html = html
        }

        //   {   // use URL as an attachment
        //     filename: 'license.txt',
        //     path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        // },

        if (attachments) {
            mailOptions.attachments = attachments;
        }

        try {
            await transporter.sendMail(mailOptions)
            console.log("Email sent", mailOptions)
            return { success: true, message: 'Email Sent' }

        } catch (error) {
            this.sendEmailBackup(params)
            console.error(error)
            return { success: false, title: 'Error, Email Not Sent.', message: 'Client network socket disconnected before secure TLS connection was established' }
        }

    };

    async sendEmailBackup(params) {

        if (!params.subject) {
            return;
        }


        console.log("sendig=ng email")

     
        var transporter = nodemailer.createTransport(
            {
                service: 'Outlook365',
                auth: {
                    // user: 'sales@jubileeallianz.co.ug',
                    // pass: "@llianz-12345"
                    user: 'quotations_jazug@jubileeuganda.com',
                    pass: "@llianz-123"
                    // user : 'mukasa@jubileeuganda.com',
                    // pass : "Ell@te#198678"
                },

            });


        // var from = 'sales@jubileeallianz.co.ug';//params.from || 'Quotations JAZUG';
        var from = 'quotations_jazug@jubileeuganda.com';//params.from || 'Quotations JAZUG';
        var to = params.to;
        var cc = params.cc;
        var subject = params.subject;
        var text = params.text;
        var attachments = params.attachments;
        var html = params.html;

        var mailOptions: any = {
            from: from, //'"Fred Foo ðŸ‘»" <foo@blurdybloop.com>', // sender address
            to: to,//'ate@gmail.com, baz@blurdybloop.com', // list of receivers
            cc: cc,
            subject: subject,//'Hello âœ”', // Subject line
            text: text,//'Hello world ?', // plain text body
            html: html //'<b>Hello world ?</b>' // html body
        };
        if (html) {
            mailOptions.text = undefined
            mailOptions.html = html
        }

        //   {   // use URL as an attachment
        //     filename: 'license.txt',
        //     path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        // },

        if (attachments) {
            mailOptions.attachments = attachments;
        }

        try {
            await transporter.sendMail(mailOptions)
            console.log("Email sent", mailOptions)
            return { success: true, message: 'Email Sent' }

        } catch (error) {
            console.error(error)
            return { success: false, title: 'Error, Email Not Sent.', message: 'Client network socket disconnected before secure TLS connection was established' }
        }

    };




    async sendEmailInfobip(params) {

        function toArray(input) {
            if (typeof input === 'string') {
              // If the input is a string and contains a comma, split it using commas as delimiters
              if (input.includes(',')) {
                return input.split(',').map(item => item.trim());
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
        const apiKey = "App 16ed723b6809615a4628a3523a3c2921-0101b3ee-cf9d-493d-8300-b3b7b4144adf"
        const apiBaseURL = 'https://gyg426.api.infobip.com';


        const SENDER_EMAIL = params.from || 'sales@jubileeallianz.co.ug';
        const RECIPIENT_EMAILS = toArray(params.to)
        const CC_EMAILS = toArray(params.cc)
        const EMAIL_SUBJECT = params.subject
        const EMAIL_TEXT = params.text

        var attachments = params.attachments;
        let REMOTE_ATTACHMENTS = []
        if (attachments && attachments.length) {
            for (const file of attachments) {
                REMOTE_ATTACHMENTS.push({ url: file.path, name: file.filename })
            }
        }

        console.log('to address:', RECIPIENT_EMAILS)

        const formData = new FormData();
        formData.append('from', SENDER_EMAIL);
        formData.append('subject', EMAIL_SUBJECT);
        formData.append('text', EMAIL_TEXT);


        for (const t of RECIPIENT_EMAILS) {
            formData.append('to', t)
        }
        for (const t of CC_EMAILS) {
            formData.append('cc', t)
        }


        const fetchAndAppendAttachments = async () => {
            for (const { url, name } of REMOTE_ATTACHMENTS) {
                const response = await axios.get(url, { responseType: 'stream'});
                formData.append('attachment', response.data, { filename: name });
            }
        };

        try {
            await fetchAndAppendAttachments();
            
            const headers = { Authorization: apiKey, ...formData.getHeaders() };
            const response = await axios.post(`${apiBaseURL}/email/3/send`, formData, { headers });
            console.log('Status Code:', response.status);
            console.log(JSON.stringify(response.data));
            return { success: true, message: 'Email Sent via Infobip' }
        } catch (error) {
            console.error(error.response.data.requestError);
            // console.error("Error", error);
            return { success: false, title: 'Infobip - Error, Email Not Sent.', message: 'Client network socket disconnected before secure TLS connection was established' }
        }

    }


    sendInfoBipSMS(text, phone) {


        // Set up InfoBip API credentials
        const apiKey = '16ed723b6809615a4628a3523a3c2921-0101b3ee-cf9d-493d-8300-b3b7b4144adf';
        const apiBaseURL = 'https://gyg426.api.infobip.com';

        // Set up the SMS message details
        const message = {
            from: 'JAZUG',
            to: phone,
            destinations: [
                { to: phone, messageId: Date.now() }
            ],
            text: text,
        };

        const postData = {
            messages: [message]
        }

        // Send the SMS message
        axios
            .post(`${apiBaseURL}/sms/2/text/advanced`, postData, {
                headers: {
                    Authorization: `App ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log('SMS sent successfully!');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error sending SMS:', JSON.stringify(error.response.data));
            });

    }

    async sendAfricasTalkingSMS(text, phone) {
        // this.sendInfoBipSMS(text, phone)
        // return


        // Initialize a service e.g. SMS
        const sms = Africastalking.SMS

        // Use the service
        let p = String(phone)
        if(!p.startsWith('+')){
            p = `+${p}`
        }

        const options = {
            to: [p],
            from: 'JAZUG',
            message: text
        }


        // Send message and capture the response or error
        try {
            let response = await sms.send(options)
            console.log("SMS success: ", response);
            return true;
        } catch (error) {
            console.log("SMS Error: ", error);
            this.sendInfoBipSMS(text, phone)
            return false;
        }

    }

    delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

}