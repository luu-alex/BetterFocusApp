var ObjectID = require('mongodb').ObjectID;
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
    app.get(urlPrefix + "users", async (request, response) => { // should return maybe only usernames in future to add as connections....
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
    app.post(urlPrefix + "addUser", async (request, response) => { //tested already
        try {
            const user = await UserModel.findOne({'username': request.body.username});
            if (user) {
                response.status(404);
                response.json({status:404, "message": "User with username already exists"});
                return
            }
            let newuser = UserModel(request.body);
            var result = await newuser.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    // used to query one used by username.
    // Need to add authentication
    app.get(urlPrefix + "user/:username", async (request, response) => { //eventually return users personal profile //tested already
        try {
            const user = await UserModel.findOne({'username': request.params.username});
            if (!user) {
                response.status(404);
                response.json({status:404, "message": `User with ${request.params.username} doesn't exists`});
                return
            }
            response.send(user);
            
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
    app.get(urlPrefix + "todo/all/:username", async (request, response) => { //tested already
        try {
            const user = await UserModel.findOne({'username': request.params.username});
            if (!user) {
                response.status(404);
                response.json({status:404, "message": `User with ${request.params.username} doesn't exists`});
                return
            }
            var result = await TodoModel.find({'_id' :{ $in: user.todos}});
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // return users one tasks
    // Need to add authentication
    app.get(urlPrefix + "todo/:id", async (request, response) => { //tested already
        try {
            var result = await  TodoModel.findById(request.params.id);
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // add new user
    // authenticate user and take them inside the app
    app.post(urlPrefix + "addTodo", async (request, response) => { // tested already
        try {
            var todo = new TodoModel(request.body);
            // task.user = request.params.username; // need to fix add users id once auth is added
            var username = request.body.username;
            // console.log(request.body.deadLine)
            var user = await UserModel.findOne({username});
            if (!user) {
                const error = new this.errs.NotFoundError(
                    `User with username - ${username} does not exists`
                );
                return response.status(500).send(error);
            }
            todo.user = user._id;
            var result = await todo.save();
            user.todos.push(result._id);
            await user.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    // edit user todo. 
    // Need to add authentication
    app.put(urlPrefix + "todo/edit/:id", async (request, response) => {
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
    app.delete(urlPrefix + "todo/delete/:id", async (request, response) => { // tested already with postman
        try {
            const todo = await TodoModel.findById(request.params.id).exec();
            if (!todo) {
                const error = new this.errs.NotFoundError(
                    `todo with id - ${request.params.id} does not exists`
                );
                return response.status(500).send(error);
            }
            let user = await UserModel.findOne(todo.user);
            if (!user) {
                const error = new this.errs.NotFoundError(
                    `User with username - ${username} does not exists`
                );
                return response.status(500).send(error);
            }
            // user.todos.pop(request.params.id);
            const _id = new ObjectID(request.params.id);
            var result = await TodoModel.remove({ _id: _id }, (err, res) => {
	        if(err) { console.log(err) } else { console.log(res)}
            })
            await UserModel.updateOne(
 		{ _id: new ObjectID(user._id) },
  	        { $pull: { todos: { _id: _id  } } }
	    , (err) => { if(err){ console.log(err)}});
	    response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });
    
    //                                      TASK RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // return users all tasks
    // Need to add authentication
    app.get(urlPrefix + "task/all/:username", async (request, response) => { //tested already
        try {
            const user = await UserModel.findOne({'username': request.params.username});
            if (!user) {
                response.status(404);
                response.json({status:404, "message": `Username ${request.params.username} doesn\'t exists`});
                return
            }
            var result = await TaskModel.find({'_id' :{ $in: user.tasks}});
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // return users one tasks
    // Need to add authentication
    app.get(urlPrefix + "task/:id", async (request, response) => { // tested already
        try {
            var result = await  TaskModel.findById(request.params.id).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // add new task
    // authenticate user and take them inside the app
    app.post(urlPrefix + "addTask", async (request, response) => { // tested already
        try {
            var task = new TaskModel(request.body);
            // task.user = request.params.username; // need to fix add users id once auth is added
            var username = request.body.username;
            var user = await UserModel.findOne({'username': username});
            if (!user) {
                const error = new this.errs.NotFoundError(
                    `User with username - ${username} does not exists`
                );
                return response.status(500).send(error);
            }
            task.user = user._id;
            var result = await task.save();
            user.tasks.push(result._id);
            await user.save();
            response.send(result);
        } catch (error) {
            console.log(error)
            response.status(500).send(error);
        }
    });

    // edit user task.
    // Need to add authentication
    app.put(urlPrefix + "task/edit/:id", async (request, response) => {
        try {
            console.log(request.body)
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
    app.delete(urlPrefix + "task/delete/:id", async (request, response) => { // tested with POSTMAN complete.
        try {
            const task = await TaskModel.findById(request.params.id).exec();
            if (!task) {
                const error = new this.errs.NotFoundError(
                    `task with id - ${request.params.id} does not exists`
                );
                return response.status(500).send(error);
            }
            let user = await UserModel.findOne(task.user);
            if (!user) {
                const error = new this.errs.NotFoundError(
                    `User with username - ${username} does not exists`
                );
                return response.status(500).send(error);
            }
            // user.todos.pop(request.params.id);
            const _id = new ObjectID(request.params.id);
            var result = await TodoModel.remove({ _id: _id }, (err, res) => {
	        if(err) { console.log(err) } else { console.log(res)}
            })
            await UserModel.updateOne(
 		{ _id: new ObjectID(user._id) },
  	        { $pull: { tasks: { _id: _id  } } }
	    , (err) => { if(err){ console.log(err)}});
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
