const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

//example get request
app.get('/', (req, res) =>
  res.send('Hello World!')
);

//we need to create database calls

//need to create user auth
app.listen(port, () => console.log(`app is listening on port ${port}!`))
