var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/EarthPornBlog");

//put this above app.set or else css wont' work.
app.use(express.static("public"));

app.use(methodOverride("_method"));


// no need to write .ejs extensions
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

var EarthPornSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var EarthBlog = mongoose.model("EarthBlog", EarthPornSchema);

//EarthBlog.create({
//	title: "Test Blog",
//	image:"https://i.redditmedia.com/kP8FbY0w96j-P0MkDlzOF0l7OCvLeWmzrq6oka9fAhI.jpg?w=1024&s=c6b27fe5670b79d2f0eec9e9e7e34cf5",
//	body: "hello this is first blog post"
//});

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

//create route
app.get("/blogs/new", function(req, res){
	res.render("new");
});

app.post("/blogs", function(req,res){
	// create blog
	EarthBlog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id", function(req, res){
	EarthBlog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show",{blog: foundBlog});
		}
	})
	
});

//edit update
app.get("/blogs/:id/edit", function(req, res){
	EarthBlog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog: foundBlog});
		}
	});	
})

//update blog
app.put("/blogs/:id", function(req, res){
	EarthBlog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else {
			res.redirect("/blogs/" + req.params.id);
			
		}
	});
});

//delete route
app.delete("/blogs/:id", function(req,res){
	EarthBlog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
			
		}
	})
});


app.listen(3000,function(){
	console.log("Server for Earth Porn Blog is Running");
});


	
	
	