const express = require('express');
const bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const models = require('./models');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
const port = 3000;

var db = mongoose.connect("mongodb+srv://project:summercollab@cluster0-6bcse.mongodb.net/SummerProject");





//we need to create database calls

//need to create user auth

// we use camelCase for variables

require("./server/api.js")(app, db, models);

app.get("*", function(req,res) {
    res.status(400);
    res.json({status:404, "message": "Location not found."});
})

app.listen(3000, () => {
    console.log('listening on ${port}!')
})


