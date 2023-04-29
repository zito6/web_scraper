const nodemailer = require("nodemailer");
const User = require('../models/User')

const sgMail = require("@sendgrid/mail");
const Search = require("../models/Search");

const sendEmail = async (req, res) => {
    const user = await User.findById({ _id: req[0].createdByUser })
    const search = await Search.findById({_id: req[0].createdBySearch})
    let html = "<h2>Hi, I found a few new offers that might be interesting:</h2><ul>"
    for (const car of req) {
        html += `<li><a href="${car.link}">${car.name}</a></li>`
    }
    html += "</ul>";

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email, 
    from: process.env.FROM,
    subject: `New interesting offers from your search ${search.name}`,
    html: html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
