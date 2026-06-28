import { useState, useEffect } from "react";

function TaskForm({ onAddTask, editingTask, onUpdateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title,
        description,
      });
    } else {
      onAddTask({
        title,
        description,
      });
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;