var currcontests = require('../models/allcontestmodel');
var clistscrap = require('../web-scrapping/AllContests');

var updateallcontests = async () => {
    currcontests
      .findById("5f68e3c21fabe51508de3268")
      .then((currcontestsfound) => {
        clistscrap().then((currcontestsobj) => {
          if (currcontestsobj.success) {
            currcontestsfound.currcontests = currcontestsobj.currcontests;
            currcontestsfound.success = currcontestsobj.success;
            console.log(currcontestsfound);
            currcontestsfound
              .save()
              .then((user) => {
                console.log(user);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            currcontestsfound.success = currcontestsobj.success;
            console.log(currcontestsfound);
            currcontestsfound
              .save()
              .then((user) => {
                console.log(user);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      });
};

module.exports = updateallcontests;
