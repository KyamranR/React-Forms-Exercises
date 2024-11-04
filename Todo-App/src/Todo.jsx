import { useState } from "react";

function Todo({ id, task, removeTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);

  const toggleEdit = () => setIsEditing((edit) => !edit);

  const handleChange = (e) => {
    setEditTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(id, editTask);
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editTask}
            onChange={handleChange}
            placeholder="Edit task"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <span>{task}</span>
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={() => removeTodo(id)}>X</button>
        </div>
      )}
    </div>
  );
}

export default Todo;
