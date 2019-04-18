require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const PORT = parseInt(process.env.PORT);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
 var Campground = mongoose.model('Campground', campgroundSchema);

//  CampgroundSchema.create(
//           {
//             name: 'Salmon Creek',
//             image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'
//          }, function(err, campground) {
//          if(err) {
//              console.log(err);
//          }else {
//              console.log('NEWLY CREATED CAMPGROUND: ');
//              console.log(campground);
//          }
//      });


var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg'},
    {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg'},
    {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg'},
    {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg'},
    {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg'},
    {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg'},
    {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg'}

];
app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampgrounds });
        }
    })
    // 
});

app.post('/campgrounds/new', function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name, image}
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});




app.listen(parseInt(PORT), process.env.ip, function(){

    console.log('The YelpCamp server has started');
    console.log(`Process is litesning to http://localhost:${PORT}`);
});
