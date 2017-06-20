var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/EarthPornBlog");

// no need to write .ejs extensions
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

var EarthPornSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var EarthBlog = mongoose.model("EarthBlog", EarthPornSchema);

app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	EarthBlog.find({}, function(err,blogs){
		if(err){
			console.log("Error");
		}else {
			res.render("index", {blogs: blogs});
		}
		
	});
	
});




app.listen(3000,function(){
	console.log("Server for Earth Porn Blog is Running");
});

