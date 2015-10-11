var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/client/js'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client/views'));
app.use(express.static(__dirname + '/client/css'));
app.use(express.static(__dirname + '/client/images'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.set("view engine", 'ejs');
app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res){
	res.render('index.html');
});

app.post('/signup', function(req, res){
	res.send("response coming from server");
});

app.post('/login', function(req, res){
	if(req.body.email== "user@gmail.com"&& req.body.password=="password"){
		res.send("right credentials");
	}
	else{
		res.send("login failed");
	}
});

app.listen(3000, function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("app is listening on port 3000");
	}
});