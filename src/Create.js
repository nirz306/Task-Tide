import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setPriority] = useState("");
  const[isPending,setIsPending] = useState(false);
  const history = useHistory();

const handleSubmit = (e) =>{
    e.preventDefault();
    const task = {title,description,priority};
    setIsPending(true);
    fetch('http://localhost:8000/tasks',{
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
        
    }).then(()=>{
        console.log("new task updated");
        setIsPending(false);
    })
    // history.go(-1);//go back one page in the history
    history.push('/');
}

  return (
    <div className="flex flex-col create  mx-auto justify-center items-center mt-[100px]">
      <h2 className="text-rose-500 font-bold text-[30px]">Add a new task</h2>
      <form  onSubmit={handleSubmit} className="mt-5 max-w-[800px] w-[100%]">
        <div className="pb-3">
          <label className="">Task Title</label>
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
            onChange={(e) => setdescription(e.target.value)}
            className="border block w-full p-1"
          ></textarea>
        </div>

        <div className=" pb-3">
          <label>Prirotiy:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            setclassName="border block"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {!isPending && <button className="border flex p-2 bg-rose-500 rounded-md mx-auto text-white font-semibold">
          Add Task
        </button>}
        {isPending && <button disabled className="border flex p-2 bg-rose-500 rounded-md mx-auto  text-white font-semibold">
         Adding Task..
        </button>}
      </form>
    </div>
  );
};

export default Create;
