const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const update_offers = require('../db/update_offers')


const search_mobile = ($) => {
    const cars = $('.cBox-body');
    car_data=[]
	cars.each((index, el) => {
		const car = {}
		car.name = $(el).find('.h3').text();
		car.link = $(el).find('.link--muted').attr('href');
		car.createdBySearch = searchId
		car.createdByUser = userId
		car.found_on = 'mobile'
		if (car.link && car.name != undefined) { car_data.push(car) }
	})
	update_offers(car_data)



}


module.exports= search_mobile