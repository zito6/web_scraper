const express = require('express')

const router = express.Router()
const {
  createSearch,
  deleteSearch,
  getAllSearches,
  updateSearch,
  getSearch
} = require('../controllers/searches')

router.route('/').post(createSearch).get(getAllSearches)

router.route('/:id').get(getSearch).delete(deleteSearch).patch(updateSearch)

module.exports = router
