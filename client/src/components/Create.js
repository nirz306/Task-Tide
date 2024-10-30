import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, priority };
    setIsPending(true);

    try {
      const token = localStorage.getItem("token"); // Retrieve the JWT from localStorage
      console.log("token during creating new task: ", token);
      if (!token) {
        console.error("No token found, redirecting to login.");
      navigate("/login"); // Redirect to the login page if no token is found
      return;
      }

      const response = await axios.post('http://localhost:3000/task/create', task, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Send the JWT token in the Authorization header
        },
        withCredentials: true 
      });

      console.log("New task added:", response.data);
      console.log("Newly created task ID:",response.data.taskId);
      navigate('/'); // Redirect to the homepage after successful task addition
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized error, navigate to login page
        console.error('Unauthorized, redirecting to login:', error.message);
        navigate('/login');
      } 
      else {
        console.error('Error adding task:', error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col create mx-auto justify-center items-center mt-[100px]">
      <h2 className="text-rose-500 font-bold text-[30px]">Add a new task</h2>
      <form onSubmit={handleSubmit} className="mt-5 max-w-[800px] w-[100%]">
        <div className="pb-3">
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block border w-full p-1"
          />
        </div>

        <div className="pb-3">
          <label>Task Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border block w-full p-1"
          ></textarea>
        </div>

        <div className="pb-3">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border block"
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {!isPending && (
          <button
            type="submit"
            className="border flex p-2 bg-rose-500 rounded-md mx-auto text-white font-semibold"
          >
            Add Task
          </button>
        )}
        {isPending && (
          <button
            disabled
            className="border flex p-2 bg-rose-500 rounded-md mx-auto text-white font-semibold"
          >
            Adding Task..
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
