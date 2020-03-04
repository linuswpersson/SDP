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

// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
function Data() {
    this.rating = 0;
    this.ratingMessage = '';
    this.users = [''];
    this.userIndex = 0;
    this.userImagePath = '../img/plus.png';
    
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
    this.users[this.userIndex] = array;
    this.userIndex += 1;
}

const data = new Data();


io.on('connection', function(socket) {
    /* Using a socket.emit would instantly add data upon connection.*/
    
    socket.emit('getUsers', {users: data.users, userIndex: data.userIndex});

    socket.emit('getImage', {userImagePath: data.userImagePath});
    
    socket.on('loadImage', function(load){
	socket.emit('getImage', {userImagePath: data.userImagePath})
    });
    /* Stores user data and updates the local data. */
    socket.on('saveUsers', function(array){
	data.saveUserArray(array);
	socket.emit('getUsers',{ users: data.users, userIndex: data.userIndex});
    });

    socket.on('printUser', function(print){
	    print(data.users[data.userIndex-1].userInfo);
	
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

    socket.on('saveImage',function(image){
	data.saveImage(image);
    });

  // When a connected client emits an "addOrder" message
  socket.on('addOrder', function(order) {
    data.addOrder(order);
    // send updated info to all connected clients,
    // note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });

});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
