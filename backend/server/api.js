var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db, models, mongoose) {

    var urlPrefix = "/api/";
    
    var UserModel   = mongoose.model('User'),
        TodoModel   = mongoose.model('Todo'),
        TaskModel   = mongoose.model('Task');
    
    //example get request
    app.get(urlPrefix + '/', (req, res) =>
        res.send('login.html')
    );
    // returns all users in db
    // Need to add authentication
    // app.get(urlPrefix + "users", async (request, response) => { // should return maybe only usernames in future to add as connections....
    //     try {
    //         var result = await  UserModel.find().exec();
    //         response.send(result);
    //     } catch (error) {
    //         response.status(500).send(error);
    //     }
    // });
    app.get(urlPrefix+"login", (req, res) => {
        res.send('login.html')
    })

    app.post(urlPrefix + "login", async (request, response) => {
        var bodyCount = Object.keys(request.body).length;
        var username = request.body.username;
        var password = request.body.password;
        var result = {};
        if (bodyCount != 2 || typeof username == "undefined" || typeof password == "undefined") {
            response.status(400); 
            result["error"] = "Bad POST request parameters.";
            response.json(result); //immediately respond with error code.
        } else {
            var hashedPassword = crypto.createHash("md5").update(username+password).digest("hex");
            const user = await UserModel.findOne({'username': username, 'password': hashedPassword});
            if (!user) {
                response.status(404);
                result = {status:404, "error": "Username or password incorrect"};
            } else {
                result["username"] = user.username;
                var token = jwt.sign({id: user._id, username: user.username}, secret, {expiresIn: 3600});
                result["token"] = token;
                response.status(200); 
            }
            response.json(result);
            
        }
    })

    //                                      User RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // add new user
    app.post(urlPrefix + "addUser", async (request, response) => { //tested already
        var username = request.body.username;
        var password = request.body.password;
        var result = {};
        try {
            if (Object.keys(request.body).length < 2 || typeof username == "undefined" || typeof password == "undefined") {
                response.status(404);
                response.json({status:404, "error": "Bad data sent."});
                return
            }
            const user = await UserModel.findOne({'username': username});
            if (user) {
                response.status(404);
                response.json({status:404, "erro": "User with username already exists"});
                return
            }
            var hashedPassword = crypto.createHash("md5").update(username+password).digest("hex");
            let newuser = UserModel({username: username, password: hashedPassword});
            var result = await newuser.save();
            response.json(result)
            
        } catch (error) {
            console.log(error)
            response.status(500).json(error)
        }
    });

    // used to query one used by username.
    app.get(urlPrefix + "user/:username", async (request, response) => { //eventually return users personal profile //tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.params.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
            const user = await UserModel.findOne({'username': request.params.username});
            if (!user) {
                response.status(404);
                response.json({status:404, "message": `User with ${request.params.username} doesn't exists`});
                return
            }
            response.send(user);
        })
    });
    
    // edit user profile. 
    app.put(urlPrefix + "user/:username/edit", async (request, response) => {
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.params.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
            try {
                const user = await UserModel.findOne({'username': request.params.username});
                if (!user) {
                    response.status(404);
                    response.json({status:404, "message": `User with ${request.params.username} doesn't exists`});
                    return
                }
                user.set(request.body);
                await user.save();
                response.send({user: user, message: "successfully saved"});
            } catch (error) {
                response.status(500).send(error);
            }
        })
    })
    // delete user profile from db
    app.delete(urlPrefix + "user/:username/delete", async (request, response) => {
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.params.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
            try {
                const result = await UserModel.deleteOne({ _id: decoded._id }).exec();
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
        })
    })

    //                                      TODO RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // return users all todos
    app.get(urlPrefix + "todo/all/:username", async (request, response) => { //tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.params.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
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
        })
    });

    // return users one tasks
    app.get(urlPrefix + "todo/:id", async (request, response) => { //tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            try {
                var todo = await  TodoModel.findById(request.params.id);
                if (todo.user != decoded.id) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
                response.send(todo);
            } catch (error) {
                response.status(500).send(error);
            }
        })        
    });

    // add new Todo
    app.post(urlPrefix + "addTodo", async (request, response) => { // tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.body.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."});
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
        })
    });

    // edit user todo. 
    app.put(urlPrefix + "todo/edit/:id", async (request, response) => {
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            try {
                var todo = await TodoModel.findById(request.params.id).exec();
                if (todo.user != decoded.id) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
                todo.set(request.body);
                var result = await todo.save();
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
        })
    });

    // delete users todo from db
    app.delete(urlPrefix + "todo/delete/:id", async (request, response) => { // tested already with postman
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            try {
                const todo = await TodoModel.findById(request.params.id).exec();
                if (!todo) {
                    const error = new this.errs.NotFoundError(
                        `todo with id - ${request.params.id} does not exists`
                    );
                    return response.status(500).send(error);
                }
                if (todo.user != decoded.id) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
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
                if(err) { 
                    console.log(err) 
                } else { 
                    console.log(res)}
                })
                await UserModel.updateOne(
                    { _id: new ObjectID(user._id) },
                    { $pull: { todos: { _id: _id  } } }
                    , (err) => { if(err){ console.log(err)}});
                if(result!={}){
                    response.send({message : "Deleted Successfully."});
                } else {
                    response.send({message : "Please try again, or contact the creator."});
                }
                
            } catch (error) {
                console.log(error)
                response.status(500).send(error);
            }
        })
        
    });
    
    //                                      TASK RESTFUL routes
    // ------------------------------------------------------------------------------------------------------------------

    // return users all tasks
    app.get(urlPrefix + "task/all/:username", async (request, response) => { //tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.params.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
            try {
                const user = await UserModel.findOne({'username': request.params.username});
                if (!user) {
                    response.status(404);
                    response.json({status:404, "message": `User with ${request.params.username} doesn't exists`});
                    return
                }
                var result = await TaskModel.find({'_id' :{ $in: user.tasks}});
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
        })
    });

    // return users one tasks
    app.get(urlPrefix + "task/:id", async (request, response) => { // tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            try {
                var task = await  TaskModel.findById(request.params.id);
                if (task.user != decoded.id) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
                response.send(task);
            } catch (error) {
                response.status(500).send(error);
            }
        })
    });

    // add new task
    // authenticate user and take them inside the app
    app.post(urlPrefix + "addTask", async (request, response) => { // tested already
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            if (request.body.username != decoded.username) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."});
            try {
                var task = new TaskModel(request.body);
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
                task.user = user._id;
                var result = await task.save();
                user.tasks.push(result._id);
                await user.save();
                response.send(result);
            } catch (error) {
                console.log(error)
                response.status(500).send(error);
            }
        })
    });

    // edit user task.
    app.put(urlPrefix + "task/edit/:id", async (request, response) => {
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            try {
                var task = await TaskModel.findById(request.params.id).exec();
                if (task.user != decoded.id) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
                task.set(request.body);
                var result = await task.save();
                response.send(result);
            } catch (error) {
                response.status(500).send(error);
            }
        })
    });
    
    // delete users todo from db
    app.delete(urlPrefix + "task/delete/:id", async (request, response) => { // tested with POSTMAN complete.
        jwt.verify(request.headers['x-access-token'], secret, async function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            try {
                const task = await TaskModel.findById(request.params.id).exec();
                if (!task) {
                    const error = new this.errs.NotFoundError(
                        `todo with id - ${request.params.id} does not exists`
                    );
                    return response.status(500).send(error);
                }
                if (task.user != decoded.id) return response.status(400).json({auth: false, message: "Bad request made. Token doesn't belong to user."})
                let user = await UserModel.findOne(task.user);
                if (!user) {
                    const error = new this.errs.NotFoundError(
                        `User with username - ${username} does not exists`
                    );
                    return response.status(500).send(error);
                }
                // user.todos.pop(request.params.id);
                const _id = new ObjectID(request.params.id);
                var result = await TaskModel.remove({ _id: _id }, (err, res) => {
                if(err) { 
                    console.log(err) 
                } else { 
                    console.log(res)}
                })
                await UserModel.updateOne(
                    { _id: new ObjectID(user._id) },
                    { $pull: { tasks: { _id: _id  } } }
                    , (err) => { if(err){ console.log(err)}});
                if(result!={}){
                    response.send({message : "Deleted Successfully."});
                } else {
                    response.send({message : "Please try again, or contact the creator."});
                }
                
            } catch (error) {
                console.log(error)
                response.status(500).send(error);
            }
        })
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
