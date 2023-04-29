const Offer = require('../models/offer')
const sendEmail = require('../nodemailer/send')

const update_offers = async (cars) => {
    let new_offers = []
    for (const car of cars) {
        const found_offer = await Offer.findOne(car);
        if (!found_offer) {
          await Offer.create(car);
          new_offers.push(car)
          found = true;
        }
      }
  
  
    if (new_offers.length!=0) {
      sendEmail(new_offers);
      new_offers = []
    } else {
      console.log("No new offers found.");
    }
  };
  

module.exports = update_offers


