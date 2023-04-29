const express = require('express')


const router = express.Router()


const {
    getAllOffers,
    getOffers
} = require('../controllers/offers')

router.route('/').get(getAllOffers)

router.route('/:id').get(getOffers)

module.exports = router