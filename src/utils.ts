var nodemailer = require('nodemailer');

export class Utils {

    async sendEmail(params) {

        if (!params.subject) {
            return;
        }

        console.log("sendig=ng email")

        let transporter = nodemailer.createTransport({
            service: "gmail", // e.g., 'gmail', 'yahoo', etc.
            auth: {
              user: "congounlocked@gmail.com",
              pass: "qywswupsbdqsntuw",
            },
          });
      

        var from = 'congounlocked@gmail.com';//params.from || 'Quotations JAZUG';
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
            // this.sendEmailBackup(params)
            console.error(error)
            return { success: false, title: 'Error, Email Not Sent.', message: 'Client network socket disconnected before secure TLS connection was established' }
        }

    };


    delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

}