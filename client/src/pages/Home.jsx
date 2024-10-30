import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = () => {
    setIsPending(true);
    setError(null);

    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/login');
    return;
  }

    console.log("Fetching tasks for token:", token);

    axios.get("http://localhost:3000/task", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        if (response.data.message === "No tasks available for this user") {
          setError("No tasks available");
          setTaskList([]); // Clear task list since no tasks are available
        }
        
        setTaskList(response.data);
        setIsPending(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("An error occurred while fetching tasks.",error);
        setIsPending(false);
      });
  };

  useEffect(() => {
    // Initial fetch when component mounts
    fetchTasks();

    // Set up interval to fetch tasks every 10 seconds (adjust as needed)
    const intervalId = setInterval(fetchTasks, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:3000/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTaskList(taskList.filter((task) => task._id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center w-max">
      {error && <div>{error}</div>}
      {!error && isPending && <div>Loading...</div>}
      {taskList.length > 0 && <TaskList tasks={taskList} title="All Tasks" onDelete={handleDelete} />}
    </div>
  );
};

export default Home;
