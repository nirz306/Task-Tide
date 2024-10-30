 


//relational db between task and user
const mongoose = require("mongoose");

// Defining the task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'], // Specifies the allowed values
        required: [true, 'Task priority is required'], // Makes the field required
        default: 'medium' // Sets a default value if not provided
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
});

// Creating a task model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
