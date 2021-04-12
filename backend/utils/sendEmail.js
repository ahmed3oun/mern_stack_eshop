const nodemailer = require('nodemailer')

const sendEmail = async (options) =>{
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });
      console.log('compiler it is here After sendEmail ....');
      const message = {
          from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>` ,
          to : options.email ,
          subject : options.subject,
          text : options.message
      }
      console.log('compiler it is here after message after sendEmail ...');
      //await transport.sendMail(message)
      await transport.sendMail(message)
      console.log('compiler it is here after transport.sendMail(message ....)');
      
}

module.exports = sendEmail

