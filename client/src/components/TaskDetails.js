// import { useNavigate, useParams } from "react-router-dom";
// import useFetch from "../useFetch";

// const TaskDetails = () => {
//   const { id } = useParams();
//   const {
//     data: task,
//     isPending,
//     error,
//   } = useFetch("http://localhost:3000/task/" + id);
//   const navigate = useNavigate();

//   const handleDelete = () => {
//     fetch("http://localhost:3000/task/" + task.id, {
//       method: "DELETE",
//     }).then(() => {
//       navigate('/');
//     });
//   };
//   return (
//     <div className="task-details">
//       {isPending && <div>Loading...</div>}
//       {error && <div>{error}</div>}
//       {task && (
//         <article>
//           <h2>{task.title}</h2>
//           <p>{task.description}</p>
//           <button
//             className="border flex items-center bg-rose-500 text-white p-2 rounded-lg justify-center"
//             onClick={handleDelete}
//           >
//             delete
//           </button>
//         </article>
//       )}
//     </div>
//   );
// };

// export default TaskDetails;


import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const TaskDetails = () => {
  const { id } = useParams(); // Use the task ID from the URL
  const {
    data: task,
    isPending,
    error,
  } = useFetch("http://localhost:3000/task/" + id); // Fetch task details using the ID
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch("http://localhost:3000/task/" + id, { // Use _id from the fetched task object
      method: "DELETE",
    }).then(() => {
      navigate('/'); // Navigate back to the home page
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
