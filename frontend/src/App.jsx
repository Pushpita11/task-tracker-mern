import "./App.css";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search,setSearch]=useState("");
  const totalTasks = tasks.length;

const pendingTasks = tasks.filter(
  (task) => task.status === "Pending"
).length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await api.post("/tasks", task);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {

const confirmDelete=window.confirm("Delete this task?");

if(!confirmDelete) return;

try{

await api.delete(`/tasks/${id}`);

fetchTasks();

}catch(error){

console.log(error);

}

};

  const completeTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        ...task,
        status: "Completed",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, task);

      setEditingTask(null);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredTasks=tasks.filter(task=>
task.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
      <Navbar />
      <div className="stats">

  <div className="card total">
    <h3>Total</h3>
    <p>{totalTasks}</p>
  </div>

  <div className="card pending-card">
    <h3>Pending</h3>
    <p>{pendingTasks}</p>
  </div>

  <div className="card completed-card">
    <h3>Completed</h3>
    <p>{completedTasks}</p>
  </div>

</div>

      <div className="container">
        <TaskForm
          onAddTask={addTask}
          editingTask={editingTask}
          onUpdateTask={updateTask}
        />
         <input
className="search"
type="text"
placeholder="🔍 Search Tasks..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onComplete={completeTask}
          onEdit={setEditingTask}
        />
      </div>
    </>
  );
}

export default App;