const { StatusCodes } = require('http-status-codes')
const Offer = require('../models/offer')

const getAllOffers = async (req, res) => {
    console.log(req.user.userId)
    const offers = await Offer.find({ createdByUser: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ offers, count: offers.length })
  }
  
const getOffers =  async (req, res) => {
  const {
    user: { userId },
    params: { id: searchId },
  } = req
  const offers = await Offer
  .find({createdBySearch: searchId,})
    .sort('createdAt')

  res.status(StatusCodes.OK).json({ offers, count: offers.length })
}

module.exports = {
    getAllOffers,
    getOffers
}