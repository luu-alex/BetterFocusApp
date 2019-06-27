module.exports = function(app, db, models, mongoose) {

    var urlPrefix = "/api/";
    
    var UserModel   = mongoose.model('User'),
        TodoModel   = mongoose.model('Todo'),
        TaskModel   = mongoose.model('Task');
    
    //example get request
    app.get(urlPrefix + '/', (req, res) =>
        res.send('Hello World!')
    );
    // returns all users in db
    // Need to add authentication
    app.get(urlPrefix + "/users", async (request, response) => { // should return maybe only usernames in future to add as connections....
        try {
            var result = await  UserModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    //                                      User RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // add new user
    // authenticate user and take them inside the app
    app.post(urlPrefix + "addUser", async (request, response) => {
        try {
            var user = new UserModel(request.body);
            var result = await user.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    // used to query one used by userID.
    // Need to add authentication
    app.get(urlPrefix + "user/:userID", async (request, response) => { //eventually return users personal profile
        try {
            var result = await  UserModel.find({ 'username': request.params.username}).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    // edit user profile. 
    // Need to add authentication
    app.put(urlPrefix + "user/:id/edit", async (request, response) => {
        try {
            var user = await UserModel.findById(request.params.id).exec();
            user.set(request.body);
            var result = await user.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    })
    // delete user profile from db
    // Need to add authentication
    app.delete(urlPrefix + "user/:id/delete", async (request, response) => {
        try {
            var result = await UserModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    })

    //                                      TODO RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // return users all todos
    // Need to add authentication
    app.get(urlPrefix + "todo/:username", async (request, response) => {
        try {
            var result = await  TodoModel.find({ 'username': request.params.username}).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // return users one tasks
    // Need to add authentication
    app.get(urlPrefix + "todo/:id", async (request, response) => {
        try {
            var result = await  TaskModel.findById(request.params.id).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // add new user
    // authenticate user and take them inside the app
    app.post(urlPrefix + "addTodo/:username", async (request, response) => {
        try {
            var todo = new TodoModel(request.body);
            todo.user = request.params.username;
            var result = await todo.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    // edit user todo. 
    // Need to add authentication
    app.put(urlPrefix + "todo/:id/edit", async (request, response) => {
        try {
            var todo = await TodoModel.findById(request.params.id).exec();
            todo.set(request.body);
            var result = await todo.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // delete users todo from db
    // Need to add authentication
    app.delete(urlPrefix + "todo/:id/delete", async (request, response) => {
        try {
            var result = await TodoModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    //                                      TASK RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // return users all tasks
    // Need to add authentication
    app.get(urlPrefix + "task/:username", async (request, response) => {
        try {
            var result = await  TaskModel.find({ 'username': request.params.username}).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // return users one tasks
    // Need to add authentication
    app.get(urlPrefix + "task/:id", async (request, response) => {
        try {
            var result = await  TaskModel.findById(request.params.id).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // add new task
    // authenticate user and take them inside the app
    app.post(urlPrefix + "addTask/:username", async (request, response) => {
        try {
            var todo = new TaskModel(request.body);
            task.user = request.params.username;
            var result = await todo.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    // edit user task.
    // Need to add authentication
    app.put(urlPrefix + "task/:id/edit", async (request, response) => {
        try {
            var task = await TaskModel.findById(request.params.id).exec();
            task.set(request.body);
            var result = await task.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    // delete users todo from db
    // Need to add authentication
    app.delete(urlPrefix + "task/:id/delete", async (request, response) => {
        try {
            var result = await TodoModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    //                                      STATS RESTFUL routes NOT DONE
    // ------------------------------------------------------------------------------------------------------------------

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

}