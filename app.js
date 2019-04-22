require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const PORT = parseInt(process.env.PORT);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
 var Campground = mongoose.model('Campground', campgroundSchema);

//  CampgroundSchema.create(
//           {
//             name: 'Salmon Creek',
//             image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
//             description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
//          }, function(err, campground) {
//          if(err) {
//              console.log(err);
//          }else { 
//              console.log('NEWLY CREATED CAMPGROUND: ');
//              console.log(campground);
//          }
//      });

app.get('/', function(req, res) {
    res.render('landing');
});
// Index - show all campgrounds
app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', { campgrounds: allCampgrounds });
        }
    })
    // 
});
//Create- add new campground to DB
app.post('/campgrounds/new', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name, image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});
//NEW show form to create new campground
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground});
        }
    });
    req.params.id

});


app.listen(parseInt(PORT), process.env.ip, function(){

    console.log('The YelpCamp server has started');
    console.log(`Process is litesning to http://localhost:${PORT}`);
});
