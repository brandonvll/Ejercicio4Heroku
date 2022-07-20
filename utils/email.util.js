const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });
class Email {
  constructor(to) {
    this.to = to;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });
  }
  //send the actual email
  async send(template, subject, mailData) {
    const html = pug.renderFile(
      path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
      mailData
    );
    await this.newTransport().sendMail({
      from: 'gamesoporte@gmail.com',
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
    });
  }
  async sendWelcome(name) {
    await this.send('welcome', 'welcome to our app', { name });
  }

  async sendNewGame() {
    await this.send('newGame', 'you have created a new game');
  }
}

module.exports = { Email };
