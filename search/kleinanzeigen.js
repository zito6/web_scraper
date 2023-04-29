const axios = require('axios');
const cheerio = require('cheerio');
const update_offers = require('../db/update_offers')

const search_kleinanzeigen = ($, searchId, userId) => {
    const cars = $('.aditem');
    car_data=[]
	cars.each((index, el) => {
		const car = {}
		car.name = $(el).find('.ellipsis').text();
		car.link = $(el).find('.ellipsis').attr('href');
		car.link = filter_link(car.link)
		car.createdBySearch = searchId
		car.createdByUser = userId
		car.found_on = 'kleinanzeigen'
		if (car.link && car.name != undefined) { car_data.push(car) }
	})
	update_offers(car_data)

}

function filter_link(link){
	const regex_olx = /\Ws-anzeige\W/
	if (regex_olx.test(link)) {
		return "https://www.ebay-kleinanzeigen.de" + link;
	} else return link;
}

module.exports= search_kleinanzeigen