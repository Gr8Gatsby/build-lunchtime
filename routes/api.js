var path = require('path');
var nconf = require('nconf');
 
nconf.file('settings.json')
     .env();
var yelp_consumer_key = nconf.get("yelp_consumer_key");
var yelp_consumer_secret = nconf.get("yelp_consumer_secret");
var yelp_token = nconf.get("yelp_token");
var yelp_token_secret = nconf.get("yelp_token_secret")
//console.log(nconf.get("yelp_consumer_key"));

var yelp = require('../public/js/yelp/yelp-server').createClient({  
  consumer_key: yelp_consumer_key,
  consumer_secret: yelp_consumer_secret,
  token: yelp_token,
  token_secret: yelp_token_secret,
  ssl: true
});

exports.tile = function(req, res) {
	res.sendfile(path.join(__dirname, '../public/xml/tile.xml'));
};

exports.img = function(req, res) {
  var imgName = req.param('name');
  res.sendfile(path.join(__dirname, '../public/img/' + imgName));
}

exports.restaurants = function(req, res) {
  res.json(
    [{
      'id':3,
      'name':'Chez Maman',
      'location':
        {
          'latitude' : 37.762539,
          'longitude': -122.397432
        },
      'distance': 0
    },
    {
      'id':1,
      'name':'Cafe 50',
      'location':
        {
          'latitude' : 47.646973,
          'longitude': -122.133147
        },
      'distance': 0
    },
    {
      'id':2,
      'name':'Pizzeria Delfina',
      'location':
        {
          'latitude' : 37.761860,
          'longitude': -122.424726
        },
      'distance': 0
    }]
    
  );
};

exports.yelpSearch = function(req, res){
  var llData = req.param('latitude') + ',' + req.param('longitude');

  yelp.search({term: "food", ll: llData, limit: 3, sort:2}, function(error, data) {
    res.json(data);
  });
}

exports.preferences = function(req, res) {
  res.json(
    [{ 'id' : 1 },
    { 'id' : 3 }]
  );
};

exports.mediaAttribution = function(req, res) {
  res.json(
    [{
        symbol:"img/bowl.png", 
        attributionLink:"http://thenounproject.com/term/bowl/1462/", 
        designer:"Maurizio Pedrazzoli"
    },
    {
        symbol:"img/tires.png", 
        attributionLink:"http://thenounproject.com/term/tire/13829/", 
        designer:"Veselin Andreev"
    },
    {
        symbol:"img/attr/dontbeinahurry.png",
        attributionLink:"http://www.colourlovers.com/patterns/search?query=dontbeinsuchahurry",
        designer:"ravennight & dazzelment"
    },
    {
      symbol:"img/attr/mfgcjbn.png",
      attributionLink:"http://www.colourlovers.com/pattern/4228872/mfgcjbn",
      designer:"grail143@gmail.com"
    }]);
};