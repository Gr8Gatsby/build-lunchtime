var yelp = require("../index").createClient({
  consumer_key: process.env.yelp_consumer_key,
  consumer_secret: process.env.yelp_consumer_secret,
  token: process.env.yelp_token,
  token_secret: process.env.yelp_token_secret,
  ssl: true
});


yelp.search({term: "food", location: "Houston", limit: 3, sort:2}, function(error, data) {
  console.log(error);
  console.log(data);
});

// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });