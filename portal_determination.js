const axios = require('axios')
const cheerio = require('cheerio')
const {bad_request_error} = require('./errors/bad_request')

const search_olx = require('./search/olx')
const search_kleinanzeigen = require('./search/kleinanzeigen')
const search_mobile = require('./search/mobile')
const search_autoscout = require('./search/autoscout24')
const search_fly4free = require('./search/fly4free')


const portal_determination = (target_url, searchId, userId)=>{
    const olx_regex = new RegExp('www.olx.')
    const kleinanzeigen_regex = new RegExp('www.ebay-kleinanzeigen.')
    const mobile_regex = new RegExp('suchen.mobile.de')
    const autoscout_regex = new RegExp('autoscout24')
    const fly4free_regex = new RegExp('.fly4free.')
    if (olx_regex.test(target_url, searchId, userId)) {
        console.log('olx')
        return fetch_axios(target_url, search_olx, searchId, userId)
    }
    if(kleinanzeigen_regex.test(target_url, searchId, userId)){
      console.log('kleinanzeigen')
      return fetch_axios(target_url, search_kleinanzeigen, searchId, userId)
    }
    if(mobile_regex.test(target_url, searchId, userId)){
      console.log('mobile')
      return fetch_axios(target_url, search_mobile, searchId, userId)
    }
    if(autoscout_regex.test(target_url, searchId, userId)){
      console.log('autoscout')
      return fetch_axios(target_url, search_autoscout, searchId, userId)
    }
    if(fly4free_regex.test(target_url, searchId, userId)){
      console.log('fly4free')
      return fetch_axios(target_url, search_fly4free, searchId, userId)
    }
    throw new bad_request_error('We cannot scrape this website, please check the list of supported websites')
}

const fetch_axios = (target_url, callback, searchId, userId) =>{
    axios
      .get(target_url)
      .then((response) => {
        const body = response.data;
        const $ = cheerio.load(body); 
        callback($, searchId, userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

module.exports = portal_determination