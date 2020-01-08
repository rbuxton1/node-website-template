const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

console.log("Started NodeJS component!");

var db = mysql.createPool({
  host: process.env.DB,
  user: "appUser",
  password: process.env.DB_PASS,
  database: "app"
})

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
  db.query("SELECT CURDATE() AS 'date'", function(err, sqlRes){
    res.render("index", {dbres: sqlRes});
  });
});

app.listen(3000, function(){ console.log("Listening on port 3000!"); });
