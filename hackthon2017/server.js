var express = require('express')
var bodyParser = require('body-parser')
var expressServer = express()

var cloudantUrl = "https://4fa6833c-c5ee-40c3-9157-402a4497cc79-bluemix:3c02b294dab9116eaaf10e7f48dfa9f14976b893f7d0c82fc5c2797eab884e2d@4fa6833c-c5ee-40c3-9157-402a4497cc79-bluemix.cloudant.com";
var Cloudant = require('cloudant');
var cloudant = Cloudant({url: cloudantUrl, account:"4fa6833c-c5ee-40c3-9157-402a4497cc79-bluemix", password:"3c02b294dab9116eaaf10e7f48dfa9f14976b893f7d0c82fc5c2797eab884e2d"});

var databaseName = 'pearldb';

// check if DB exists if not create
cloudant.db.create(databaseName, function(err, res) {
    if (err) {
        console.log('Could not create new db: ' + databaseName + ', it might already exist.');
    }
});

function insert(documentKey, object) {
    // Specify the database we are going to use (alice)...
    var pearldb = cloudant.db.use(databaseName);

    // ...and insert a document in it.
    pearldb.insert(object, documentKey, function(err, body, header) {
      if (err) {
        return console.log('[pearldb.insert] ', err.message);
      }

      console.log('You have inserted at key:', documentKey);
      console.log(body);
    });
}

function search() {
    var pearldb = cloudant.db.use(databaseName);
    pearldb.find({
        selector:{},
    })
}



insert('testkey', {crazy:true});




// use body parser for json
expressServer.use(bodyParser.json());

// display web page
var weboptions = {
    index: "test.html"
}
expressServer.use('/', express.static('public', weboptions));

//get input from javascript
expressServer.post('/hi', bodyParser.json(), function (req, res) {
    console.log('new user request');
    var user = req.body;
    console.log(user.name);
    console.log(user.lat);
    console.log(user.lng);
    //console.log(JSON.stringify(user));

    res.send('Hello World!');
})

expressServer.listen(3000, function () {
  console.log('Express Server listening on port 3000!');
})

