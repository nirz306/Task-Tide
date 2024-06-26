 import { Link, useHistory } from "react-router-dom";
import del from "./assests/delete.png";

const TaskList = ({ tasks, title, onDelete }) => {
  const history = useHistory();

  const handleDelete = (id) => {
    fetch("http://localhost:8000/tasks/" + id, {
      method: "DELETE",
    }).then(() => {
      onDelete(id);//calling the function from home
      history.push("/");
    });
  };

  return (
    <div className="task-list">
      <h1 className="font-bold text-[40px]">{title}</h1>

      {tasks.map((task) => (
        
        <div
          className="list-preview p-[20px] w-[500px] mx-auto hover:shadow"
          key={task.id}
        >

          <div className="flex justify-between items-center">
            
            <Link to={`/tasks/${task.id}`}>
              <h2 className="font-bold text-xl text-rose-500">{task.title}</h2>
              <p className="text-black font-bold">{task.priority}</p>
            </Link>
            
            <div
              onClick={() => handleDelete(task.id)}
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
