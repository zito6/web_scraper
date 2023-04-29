const axios = require('axios');
const cheerio = require('cheerio');
const update_offers = require('../db/update_offers')


const search_autoscout = ($, searchId, userId) => {
    const cars = $('.cldt-summary-full-item');
    car_data=[]
	cars.each((index, el) => {
		const car = {}
		car.name = $(el).find('.ListItem_title__znV2I').text();
		car.link = $(el).find('.ListItem_title__znV2I').attr('href');
		car.link = filter_link(car.link)
		car.createdBySearch = searchId
		car.createdByUser = userId
		car.found_on = 'autoscout'
		if (car.link && car.name != undefined) { car_data.push(car) }
	})
	update_offers(car_data)

}

function filter_link(link){
	const regex_olx = /\Wangebote\W/
	if (regex_olx.test(link)) {
		return "https://www.autoscout24.de" + link;
	} else return link;
}

module.exports= search_autoscout