var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TodoModel = new Schema({
    todo: String,
    isItDone: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    deadLine: {
        type: Date,
        min: Date.now,
        max: '2099-12-31'
    }
});

var Todo = mongoose.model('Todo', TodoModel, 'Todos');

module.exports = {
    Todo: Todo
}
