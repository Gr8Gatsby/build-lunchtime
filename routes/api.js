var path = require('path');

exports.tile = function(req, res){
	res.sendfile(path.join(__dirname, '../public/xml/tile.xml'));
};

exports.restaurants = function(req, res){
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

exports.preferences = function(req, res){
  res.json(
    [{ 'id' : 1 },
    { 'id' : 3 }]
  );
};

exports.mediaAttribution = function(req, res){
  res.json(
    [{
        symbol:"img/.png", 
        attributionLink:"http://thenounproject.com/term/bowl/1462/", 
        designer:"Maurizio Pedrazzoli"
    },
    {
        symbol:"", 
        attributionLink:"", 
        designer:""
    },
    {
        symbol:"", 
        attributionLink:"", 
        designer:""
    }]);
};