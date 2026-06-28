function TaskCard({ task, onDelete, onComplete, onEdit }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <span className={task.status === "Completed" ? "completed" : "pending"}>
        {task.status}
      </span>

      <div className="buttons">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
            <p className="date">
  Created: {new Date(task.createdAt).toLocaleDateString()}
</p>
          ✏ Edit
        </button>

        <button
    className="complete-btn"
    onClick={() => onComplete(task)}
    disabled={task.status === "Completed"}
>
    {task.status === "Completed" ? "✔ Completed" : "✔ Complete"}
</button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;