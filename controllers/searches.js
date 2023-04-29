const Search = require('../models/Search')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const Scraper = require('../scraper/scraper')
const Offer = require('../models/offer')



const getAllSearches = async (req, res) => {
  const searches = await Search.find({ createdByUser: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ searches, count: searches.length })
}


const getSearch = async (req, res) => {
  const {
    user: { userId },
    params: { id: searchId },
  } = req

  const search = await Search.findOne({
    _id: searchId,
    createdByUser: userId,
  })
  if (!search) {
    throw new NotFoundError(`No search with id ${searchId}`)
  }
  res.status(StatusCodes.OK).json({ search })
}

const createSearch = async (req, res) => {
  req.body.createdByUser = req.user.userId
  const search = await Search.create(req.body )
  res.status(StatusCodes.CREATED).json({ search })
}


const updateSearch = async (req, res) => {
  const {
    body: { name, link, active, interval },
    user: { userId },
    params: { id: searchId },
  } = req

  const search = await Search.findByIdAndUpdate(
    { _id: searchId, createdByUser: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!search) {
    throw new NotFoundError(`No search with id ${searchId}`)
  }
  const varName = `scraper_${searchId}`
  console.log(varName)

  if(active){
    global[varName]= new Scraper(link, searchId, req.user.userId)
    global[varName].startScraping(interval)

  }
  if(active==false){
    if(global[varName]){
      global[varName].stopScraping()
      delete global[varName]
    }else{
      throw new BadRequestError("Search allready deleted")
    }
  }
  res.status(StatusCodes.OK).json({ search })
}

const deleteSearch = async (req, res) => {
  const {
    user: { userId },
    params: { id: searchId },
  } = req
  const varName = `scraper_${searchId}`
  console.log(varName)
  if(global[varName] != undefined){
    global[varName].stopScraping()
    delete global[varName]
  }
  const search = await Search.findByIdAndRemove({
    _id: searchId,
    createdByUser: userId,
  })
  const offer = await Offer.deleteMany({
    createdBySearch: searchId,
  })
  if (!search) {
    throw new NotFoundError(`No search with id ${searchId}`)
  }
  res.status(StatusCodes.OK).json({msg: "Search deleted sucessfully"})
}

module.exports = {
  createSearch,
  deleteSearch,
  getAllSearches,
  updateSearch,
  getSearch,
}