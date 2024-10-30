    const Task = require("../models/task");
    const express = require("express");
    const router = express.Router();
    const { restrictToLoggedinUserOnly } = require('../middleware/auth');

    const{handleGenerateNewTask,handleDeleteTask,handleGetAllTasks, handleGetSpecifiedTask
    } = require("../controllers/task");
    router.post("/create", restrictToLoggedinUserOnly, handleGenerateNewTask);
    router.delete("/:id",restrictToLoggedinUserOnly,handleDeleteTask);
    router.get("/:id", restrictToLoggedinUserOnly,handleGetSpecifiedTask)
    router.get("", restrictToLoggedinUserOnly, handleGetAllTasks);
    module.exports = router;
