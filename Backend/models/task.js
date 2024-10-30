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
        enum: ['low', 'medium', 'high'],  
        required: [true, 'Task priority is required'],  
        default: 'medium'  
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
});
 
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
