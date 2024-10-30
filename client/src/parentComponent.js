import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const ParentComponent = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TaskList tasks={tasks} title="All Tasks" onDelete={handleDelete} />
    </div>
  );
};

export default ParentComponent;
