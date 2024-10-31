// TaskList Component
import { Link, useNavigate } from "react-router-dom";
import del from "../assests/delete.png";

const TaskList = ({ tasks, title, onDelete }) => {
  const navigate = useNavigate();

  const handleGetTask = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/task/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const task = await response.json();
        // Assuming you have a route for task details
        navigate(`/task/${id}`, { state: { task } });
      } else {
        console.error("Failed to fetch task");
      }
    } catch (error) {
      console.error("Error retrieving task:", error);
    }
  };

  const handleDelete = (id) => {
    fetch("http://localhost:3000/task/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      onDelete(id); // Call the delete handler from Home component
      navigate('/');
    }).catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="task-list">
      <h1 className="font-bold text-[40px]">{title}</h1>

      {tasks.map((task) => (
        <div
          className="list-preview p-[20px] w-[500px] mx-auto hover:shadow"
          key={task._id}
        >
          <div className="flex justify-between items-center">
            <Link onClick={() => handleGetTask(task._id)} to={`/task/${task._id}`}>
              <h2 className="font-bold text-xl text-rose-500">{task.title}</h2>
              <p className="text-black font-bold">{task.priority}</p>
            </Link>

            <div
              onClick={() => handleDelete(task._id)}
              className="size-[7%] cursor-pointer"
            >
              <img src={del} alt="Delete" className="transition-transform transform hover:scale-110" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
