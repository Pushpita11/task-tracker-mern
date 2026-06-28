import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete, onComplete , onEdit}) {
  if(tasks.length===0){

return(

<div className="empty">

📭

<h2>No Tasks Found</h2>

<p>Add your first task above.</p>

</div>

)

}

return(

<div className="task-list">

{tasks.map(task=>(

<TaskCard

key={task._id}

task={task}

onDelete={onDelete}

onComplete={onComplete}

onEdit={onEdit}

/>

))}

</div>

)
}

export default TaskList;