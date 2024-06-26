import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const TaskDetails = () => {
  const { id } = useParams();
  const {
    data: task,
    isPending,
    error,
  } = useFetch("http://localhost:8000/tasks/" + id);
  const history = useHistory();

  const handleDelete = () => {
    fetch("http://localhost:8000/tasks/" + task.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };
  return (
    <div className="task-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {task && (
        <article>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button
            className="border flex items-center bg-rose-500 text-white p-2 rounded-lg justify-center"
            onClick={handleDelete}
          >
            delete
          </button>
        </article>
      )}
    </div>
  );
};

export default TaskDetails;
