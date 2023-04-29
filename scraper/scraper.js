const portal_determination = require('../portal_determination')
const search = require('../models/Search')

class Scraper {
    constructor(link, searchId, userId ) {
      this.link = link;
      this.searchId = searchId
      this.userId = userId
      //this.email = email;
      this.intervalId = null
      this.name = `scraper_${searchId}`;
    }
  
    startScraping(interval) {
      portal_determination(this.link, this.searchId, this.userId);
      console.log(this.name)
      const intervalInMs = interval *60 * 1000
      console.log(intervalInMs)
      this.intervalId = setInterval(async () => {
        portal_determination(this.link, this.searchId, this.userId);
      }, intervalInMs);
    }
  
    stopScraping() {
      clearInterval(this.intervalId);
    }
    async 
  
  }
  
  module.exports = Scraper;