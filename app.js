/* jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Pick arbitrary port for server
const port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue',
  express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/map.html'));
});
// Serve rating.html as /rating
app.get('/rating', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/user/html/rating.html'));
});

/* TODO: Save user data so (ex) data.user[0] pulls out all relevant info for that specific user. */
/* For now I will code it with only 1 user in consideration. */
function Data() {
    this.profiles = [];
    this.matches = [];

    this.gender = '';
    this.seeking = '';
    this.phone = '';
    this.name = '';
    this.rating = 0;
    this.ratingMessage = '';
    this.users = [''];
    this.userIndex = 0;
    this.userImagePath = '../img/plus.png';
    this.userBubbles = [];
    this.femaleIndex= 10;
}

Data.prototype.saveBubbles = function(bubble){
    this.userBubbles = bubble.bubbleArray;
}

Data.prototype.saveImage = function(image){
    this.userImagePath = image.path;
}
/* Add rating to queue */
/* Hopefully there is a better looking way of saving these. */
Data.prototype.saveRating = function(rating, message) {
    this.rating = rating;
    this.ratingMessage = message;
}

Data.prototype.getUserArray = function(){
    return this.users;
}
/* Puts new array in the first slot of the user array */
/* Probably not the best idea */
Data.prototype.saveUserArray = function(array){
    this.name = array.name;
    this.gender = array.gender;
    this.seeking = array.seeking;
    this.phone = array.phone;
    this.users[this.userIndex] = array;

}

const data = new Data();


io.on('connection', function(socket) {
    /* These are the things loaded upon load */
    socket.emit('getUsers', {username: data.name,phone: data.phone, gender: data.gender, seeking: data.seeking, userIndex: data.userIndex});
    socket.emit('getImage', {userImagePath: data.userImagePath});
    socket.emit('getBubbles', {userBubbles: data.userBubbles});
    socket.emit('hello', { gender: data.gender, name: data.name});
    /*-----------------------------------------------------------------*/
    
    /* Updates image whenever a new one is selected. */
    socket.on('loadImage', function(load){
	socket.emit('getImage', {userImagePath: data.userImagePath})
    });
    /* Stores user data and updates the local data. */
    socket.on('saveUsers', function(array){
	data.saveUserArray(array);
	socket.emit('getUsers',{ users: data.users, userIndex: data.userIndex});
    });
    /* Stores the selected image */
    socket.on('saveImage',function(image){
	data.saveImage(image);
    });

    socket.on('updateBubble', function(bubble){
	data.userBubbles = bubble.bubbleArray;
    })

    /*------------------------------------------------------------------*/


    
    /* None of the functions below serve any other purpose than for testing */

    socket.on('printBubbles', function(print){
	print(data.userBubbles.bubbleArray);
    })

    
    socket.on('printUser', function(print){
	    print(data.users[data.userIndex].id);
	
    });

    socket.on('printImage', function(print){
	print(data.userImagePath);
    })
    
    socket.on('saveRating', function (rating,message, fn) {
	data.saveRating(rating, message);
	fn(rating);

    });
    /* A print function ensuring that things have been stored properly */
    socket.on('printALL', function(print){
	print(data.ratingMessage + ' rating ' + data.rating);	
    });

});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
