const Task = require("../models/task");

async function handleGenerateNewTask(req, res) {
    try {
         
        const { title, description, priority } = req.body;

        if (!title || !description || !priority) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!req.user || !req.user._id) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const newTask = new Task({
            title,
            description,
            priority,
            createdBy: req.user._id // Access user ID from req.user
        });
      
        await newTask.save();
        console.log("user at handle generated task before saving is: ",req.user);
        console.log("task created!!\n")

 

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
       
        const allTasks = await Task.find({ createdBy: req.user._id });
        

        console.log("Retrieved tasks for user:", req.user._id, allTasks);

        
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
