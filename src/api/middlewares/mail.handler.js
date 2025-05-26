import nodemailer from "nodemailer";

const {
  MAIL_USER: user,
  MAIL_PASSWORD: password,
  MAIL_SENDER: sender,
  MAIL_HOST: host,
  MAIL_PORT: port,
  MAIL_SECURE: secure,
  MAIL_REJECT_UNAUTHORIZED: rejectUnauthorized,
} = process.env;

export async function sendMail(emailTo, emailCC=null, emailBCC=null, subject, htmlBody) {
  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: password,
      },
      tls: {
      rejectUnauthorized: false,
    },
    });

    const mailOptions = {
      from: sender,
      to: emailTo,
      cc: emailCC || undefined,
      bcc: emailBCC || undefined,
      subject: subject,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Course enrollment send to the ${emailTo}`);
    return info;
  } catch (error) {
    console.error(`ERROR :: SendMail function :: ${error}`);
  }
}
