import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const createEmailContent = (link: string, fName: string) => {
  const html = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      .container {
        text-align: center;
        direction: ltr;
        margin: 0 auto;
        padding: 2rem;
        max-width: 600px;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        font-weight: bold;
        color: #5f17e1;
      }
      .header{
        font-weight: 500;
        font-size: 1.1rem;
      }
      p{
        text-align: center;
      }
      a {
        padding: 0.5rem 1rem;
        text-decoration: none;
        border-radius: 5px;
        font-weight: 400;
        font-size: 1rem;
        border: none;
        background-color: #5f17e1;
        color: #ffffff !important;
        margin-top: 1rem;
        display: block;
        width: max-content;
        margin: auto;
      }
    </style>
  </head>
  <body>
  <div class="container">
  <h1>Hotix</h1>
  <span class="header">Reset password</span>
  <hr />
  <p>Dear ${fName},</p>
  <p>Forgot your password? <br />
  We received a request to reset the password for your account.</p>
  <span>To reset your password, click on the button below:</span>
  <a href="${link}" target="_blank">Reset password</a>
  <p>Thank you!</p>
  </div>
  </body>
</html>
  `;
  return html;
};

const sendEmail = async (email: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

export default sendEmail;
