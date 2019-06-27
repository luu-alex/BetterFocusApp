module.exports = function(app, db, models, mongoose) {

    var urlPrefix = "/api";
    var UserModel = mongoose.model('User');
    //example get request
    app.get(urlPrefix + '/', (req, res) =>
        res.send('Hello World!')
    );

    

    app.get(urlPrefix + "/users", async (request, response) => {
        try {
            var result = await  UserModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get(urlPrefix + "/users/:user", async (request, response) => {
        try {
            var result = await  UserModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.put(urlPrefix + "user/:user/edit", async (request, response) => {
        var username = req.params.user;
        try {
            var result = await  UserModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    })

    app.get(urlPrefix + "/todos", async (request, response) => {
        try {
            var result = await  models.todos().find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get(urlPrefix + "/tasks", async (request, response) => {
        try {
            var result = await  models.tasks().find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get(urlPrefix + "/store", async (request, response) => {
        try {
            var result = await  models.store().find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.get(urlPrefix + "/stats", async (request, response) => {
        try {
            var result = await  models.stats.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.post(urlPrefix + "/addUser", async (request, response) => {
        console.log("came in post");
        try {
            var user = new UserModel(request.body);
            var result = await user.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });


    app.post(urlPrefix + "/addTask", async (request, response) => {
        try {
            var user = new TaskModel(request.body);
            var result = await task.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.post(urlPrefix + '/addStats', (req, res) => {
        db.collection('Stats').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('new stat added to database')
            res.redirect('/')
        })
    })

    app.post(urlPrefix + '/addTodo', (req, res) => {
        db.collection('Todo').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('new todo added to database')
            res.redirect('/')
    })
    })

    app.post(urlPrefix + '/addStoreItem', (req, res) => {
        db.collection('Store').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('new store item added to database')
            res.redirect('/')
    })
    })

}