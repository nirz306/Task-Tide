// import TaskList from "./TaskList";
// import useFetch from "./useFetch";

// const Home = () => {
//   const { data: tasks, isPending, error } = useFetch("http://localhost:8000/tasks");

//   return (
//     <div className="flex flex-col items-center justify-center w-[300px] ">
      
//       {error && <div>{error}</div>}
      
//       {!error && isPending && <div>Loading...</div>}
      
//       {tasks && <TaskList tasks={tasks} title="All Tasks" />}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import useFetch from "./useFetch";

const Home = () => {
  const { data: tasks, isPending, error } = useFetch("http://localhost:8000/tasks");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks);
    }
  }, [tasks]);

  const handleDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));//just filter those which arent to be deleted 
  };

  return (
    <div className="flex flex-col items-center justify-center w-max">
      {error && <div>{error}</div>}
      {!error && isPending && <div>Loading...</div>}
      {taskList && <TaskList tasks={taskList} title="All Tasks" onDelete={handleDelete} />} 
      {/* passing the handledelete as a prop */}
    </div>
  );
};

export default Home;
