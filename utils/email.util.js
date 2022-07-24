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
    if (process.env.NODE_ENV === 'development') {
      //connect to SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENGRID_API_KEY,
        }
      });
    }
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
      from: 'brandon_1998_milan@hotmail.com',
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
    });
  }
  async sendWelcome(name) {
    await this.send('welcome', 'welcome to our app', { name });
  }

  async sendNewGame(title, genre) {
    await this.send('newGame', 'you have created a new game', { title, genre });
  }
  async sendNewConsole(name, company) {
    await this.send('newConsole', 'you have register new console', {
      name,
      company
    });
  }
}

module.exports = { Email };
