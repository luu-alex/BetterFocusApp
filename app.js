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
var db;

//example get request
app.get('/', (req, res) =>
    res.send('Hello World!')
);

app.get('/index', (req, res) =>
    res.send('index.html')
);

app.get("/users", async (request, response) => {
    try {
        var result = await  UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/todos", async (request, response) => {
      try {
          var result = await  TodoModel.find().exec();
          response.send(result);
      } catch (error) {
          response.status(500).send(error);
      }
});

app.get("/tasks", async (request, response) => {
    try {
        var result = await  TaskModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/store", async (request, response) => {
    try {
        var result = await  StoreModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/stats", async (request, response) => {
    try {
        var result = await  StatsModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
//we need to create database calls

//need to create user auth

// we use camelCase for variables

app.post("/addUser", async (request, response) => {
    try {
        var user = new UserModel(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.post("/addTask", async (request, response) => {
    try {
        var user = new TaskModel(request.body);
        var result = await task.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post('/addStats', (req, res) => {
    db.collection('Stats').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('new stat added to database')
        res.redirect('/')
    })
})

app.post('/addTodo', (req, res) => {
    db.collection('Todo').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('new todo added to database')
        res.redirect('/')
  })
})

app.post('/addStoreItem', (req, res) => {
    db.collection('Store').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('new store item added to database')
        res.redirect('/')
  })
})


mongoose.connect("mongodb+srv://project:summercollab@cluster0-6bcse.mongodb.net/SummerProject");
app.listen(3000, (port) => {
  console.log('listening on ${port}!')
})
