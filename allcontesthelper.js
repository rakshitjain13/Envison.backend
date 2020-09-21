var currcontests = require('./models/allcontestmodel');
var clistscrap = require('./web-scrapping/AllContests');

var initialcontest = function () {
  clistscrap().then((contestobj) => {
    if (contestobj.success) {
      var currcontestini = new currcontests();
      currcontestini.currcontests = contestobj.currcontests;
      currcontestini.success = contestobj.success;
      console.log(currcontestini);
      currcontestini
        .save()
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var currcontestini = new currcontests();
      currcontestini.success = contestobj.success;
      console.log(currcontestini);
      currcontestini
        .save()
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

module.exports = initialcontest;
