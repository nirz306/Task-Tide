const Task = require("../models/task");

async function handleGenerateNewTask(req, res) {
    try {
        // console.log("Incoming request body:", req.body); // Log request data
        const { title, description, priority } = req.body;

        if (!title || !description || !priority) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if req.user is defined
        
        console.log("user at handle generated task before saving is: ",req.user);

        if (!req.user || !req.user._id) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const newTask = new Task({
            title,
            description,
            priority,
            createdBy: req.user._id // Access user ID from req.user
        });
        // console.log("New task (before save):", newTask);
        await newTask.save();
        console.log("user at handle generated task before saving is: ",req.user);
        console.log("task created!!\n")

        // console.log("Saved task ID:", newTask._id);

        res.status(201).json({
            message: 'Task created successfully',
            taskId: newTask._id
        });
    } catch (err) {
        console.error('Error saving the task:', err);
        res.status(500).json({ error: 'Failed to create task', details: err.message });
    }
}


async function handleDeleteTask(req, res) {
     try{
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        //if task is not found then 
        if(!deletedTask)
                return res.status(404).json({error:'Task not found'});
        
        res.status(200).json({ message: 'Task deleted successfully' });
     }
     catch(err){
        console.error('Error deleting the task:', err);
        res.status(500).json({ error: 'Failed to delete task' });
     }
}

async function handleGetAllTasks(req,res){
    try {
        // Find all tasks created by the logged-in user
        const allTasks = await Task.find({ createdBy: req.user._id });
        // const allTasks = await Task.find({ createdBy: req.user._id });

        console.log("Retrieved tasks for user:", req.user._id, allTasks);

        // If no tasks found, return a 404 error
        if (allTasks.length === 0) {
            console.log("no tasks");
            return res.status(200).json({ message: 'No tasks available for this user', tasks: [] });
        }
        

        // Return all tasks found for the user
        res.status(200).json(allTasks);
    } catch (err) {
        console.error('Error retrieving tasks:', err);
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
}

async function handleGetSpecifiedTask(req,res){
    try{
        const taskId = req.params.id;
        const specificTask = await Task.findById(taskId);

        if(!specificTask)
            return res.status(404).json({error:'Task not found'});

        res.status(200).json(specificTask);
    }
    catch(err){
        console.error('Error retrieving particular task:', err);
        res.status(500).json({ error: 'Failed to retrieve particular task' });
    }
}

module.exports = {
    handleGenerateNewTask,
    handleDeleteTask,
    handleGetAllTasks,
    handleGetSpecifiedTask
};
