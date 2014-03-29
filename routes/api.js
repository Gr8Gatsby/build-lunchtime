var path = require('path');

exports.tile = function(req, res){
	res.sendfile(path.join(__dirname, '../public/xml/tile.xml'));
};

exports.restaurants = function(req, res){
	res.json(
    [{
      'id':3,
      'name':'Sage Cafe',
      'location':
        {
          'latitude' : 37.778023,
          'longitude': -122.422500
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
      'name':'Zuni Cafe',
      'location':
        {
          'latitude' : 37.773372,
          'longitude': -122.421663
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