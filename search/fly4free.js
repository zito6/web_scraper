const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const update_offers = require('../db/update_offers')

const search_fly4free = ($) => {
    const cars = $('.item__header');
    car_data=[]
	cars.each((index, el) => {
		const car = {}
		car.name = $(el).find('.item__title').text();
		car.link = $(el).find('.item__details').attr('href');
		car.createdBySearch = searchId
		car.createdByUser = userId
		car.found_on = 'olx'
		if (car.link && car.name != undefined) { car_data.push(car) }
	})
	update_offers(car_data)
}

module.exports= search_fly4free