//(C) MARIELA TINAJERO

var express = require('express'), 			//web application framework for node
	http = require('http'), 				//to create an http server
	bodyParser = require('body-parser'),	//middleware (manipulates req, and res objects) used for body parsing like in posts
	cookieParser = require('cookie-parser'),//middleware to help parse cookie headers
	session = require('express-session'),	//middleware for sessions
	passport = require('passport'),			//middleware for authentication
	flash = require('connect-flash'),		//middleware for flash
	models = require('./models'),			//database models
	controllers = require('./controllers'),	//controllers
	app = express(),
	server;

//when a view does not have an extension use jade by default ex. index will result in index.jade
app.set('view engine', 'jade');

//The "use" keyword mounts the middleware (makes it active); order is important in middleware
app.use(express.static(__dirname + '/public'));		//for serving static content in this case server from public folder you can add more than one folder
app.use(cookieParser());
app.use(bodyParser.json());							//for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));	//for parsing application/x-www-form-urlencoded
app.use(flash());									//for storing messages in the session
//Warning add session store (default is in memory) documentation express.session
app.use(session({secret: 'my node framework', saveUninitialized: true, resave: true})); //session
app.use(passport.initialize());							 //passport is for authentication
app.use(passport.session());

controllers.init(app);									 //initialize the controllers
models.sequelize.sync();								 //create database if not exits only do this at the beginning

server = http.createServer(app);						 //create the server

server.listen(3000, function(){							//start listening
	console.log('Server listening on port 3000');
});

var socketio = require('socket.io');						//used for web sockets
var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
	console.log('socket connected');
});
	