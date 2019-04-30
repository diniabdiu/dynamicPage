var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Cloud\'s Rest',
        image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
        description: 'blaalla'
    },
    {
        name: 'Desert Mesa',
        image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
        description: 'blaalla'
    },
    {
        name: 'Canyon Floor',
        image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
        description: 'blaalla'
    },
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log('removed campgrounds!');
         // Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('added a campground');
                    //create a comment
                    Comment.create(
                        {
                            text: 'this place is great, but I wish athere was internet',
                            autor: 'homer'
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            }else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment');
                            }
                        });
                }
            });
        });
    });
   
    // Add a few comments
}
module.exports = seedDB;