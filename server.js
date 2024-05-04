const express = require("express")
const path = require("path")
const app = express();
const port = 3000;
const bodyParser = require("body-parser")
const exp = require("constants");
const connection = require("/home/blubby2k/Desktop/Site/db.js")

app.use(express.urlencoded({extended: false}))
app.unsubscribe(express.static(path.join(__dirname,'static')))
app.use(express.static('public'))

app.get("/",(req,res) => {
	res.sendFile(__dirname + "/views/index.html")
})

app.get("/views/about.html",(req,res) => {
	res.sendFile(__dirname + "/views/about.html")
})

app.get("/views/sql.html",(req,res) => {
	res.sendFile(__dirname + "/views/sql.html")
})

app.post("/api", function(req,res){
	console.log(req.body)
	const username = req.body.user
	const password = req.body.password
	// secure code
	connection.query("INSERT INTO sql_injection (user,password) VALUES (?,?)",
	[username,password],
	(err,result) => {
		console.log(err);
	}
		) 
})

app.post("/login", function(req, res){
	const username1 = req.body.user1
	const password1 = req.body.password1
	// unsecure code
	// sql injection vulnerability
	connection.query("SELECT * FROM sql_injection WHERE user = '" + req.body.user1 + "' AND password = '" + req.body.password1 + "' ",
	[username1,password1],
	(err, result) => {
		if (err) {
			res.send({err: err})
		}
		if (result.length > 0) {
			res.send({Message: "Logged in"})
		}
		else 
		{
        res.send({Message: "Wrong username/password"})
        }
	}
	);
})

app.listen(port,function(){ 
	console.log("Server is workig")
	connection.connect(function(err){
		if(err) throw err;
		console.log("Database is working");
	})
})