require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: 'Salmon Creek', image: 'https://farm5.staticflickr.com/4044/4175370953_5488caf554.jpg'},
    {name: 'Salmon Creek', image: 'https://farm6.staticflickr.com/5108/5789045796_27c9217bf2.jpg'}

];
app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
    res.send('YOU HIT THE POST ROUTE!');
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});
app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});


const PORT = parseInt(process.env.PORT);

app.listen(parseInt(PORT), process.env.ip, function(){

    console.log('The YelpCamp server has started');
    console.log(`Process is litesning to http://localhost:${PORT}`);
});


