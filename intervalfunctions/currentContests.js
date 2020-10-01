var currcontests = require('../models/allcontestmodel');
var clistscrap = require('../web-scrapping/AllContests');

var updateallcontests = async () => {
    currcontests
      .findById("5f6afd6a396c552b307a06db")
      .then((currcontestsfound) => {
        clistscrap().then((currcontestsobj) => {
          if (currcontestsobj.success) {
            currcontestsfound.currcontests = currcontestsobj.currcontests;
            currcontestsfound.success = currcontestsobj.success;
           
            currcontestsfound
              .save()
             
          } else {
            currcontestsfound.success = currcontestsobj.success;
          
            currcontestsfound
              .save()
          }
        });
      });
};

module.exports = updateallcontests;
