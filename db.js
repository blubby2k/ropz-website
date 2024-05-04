const mysql = require("mysql2")
var db = mysql.createConnection({
	host: "127.0.0.1",
	database: "************",
	user: "************",
	password: "************"
})

module.exports = db;