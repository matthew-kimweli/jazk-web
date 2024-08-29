import { Injectable } from '@nestjs/common';

const nodemailer = require('nodemailer');

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmailWithAttachment(pdfBuffer, client) {
    // Configure nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
        auth: {
            user: 'congounlocked@gmail.com',
            pass: 'qywswupsbdqsntuw'
        }
    });

    // Email options
    let mailOptions = {
        from: 'congounlocked@gmail.com',
        to: client.email,
        subject: 'Quotation PDF',
        text: `Hi, ${client.name}, please find attached the quotation PDF.`,
        attachments: [
            {
                filename: 'quotation.pdf',
                content: pdfBuffer
            }
        ]
    };

    // Send email
    try {
        console.log('sending email')
        let sent = await transporter.sendMail(mailOptions);
        console.log('sent email', sent)
        return sent
    } catch (error) {
        console.error(error)
    }
}
}
