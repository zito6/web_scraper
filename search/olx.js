const axios = require('axios');
const cheerio = require('cheerio');
const update_offers = require('../db/update_offers')

const search_olx = ($, searchId, userId) => {
	const cars = $('.css-1sw7q4x');
    car_data=[]
	cars.each((index, el) => {
		const car = {}
		car.name = $(el).find("h6").text();
		car.link = $(el).find('.css-rc5s2u').attr('href');
		car.link = filter_link(car.link)
		car.createdBySearch = searchId
		car.createdByUser = userId
		car.found_on = 'olx'
		if (car.link && car.name != undefined) { car_data.push(car) }
	})
	update_offers(car_data)

}
function filter_link(link){
	const regex_olx = /\Wd\Woferta\W/
	if (regex_olx.test(link)) {
		return "https://www.olx.pl" + link;
	} else return link;
}

module.exports= search_olx