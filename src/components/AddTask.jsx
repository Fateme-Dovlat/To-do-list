
function AddTask({ task, setTask, addTask }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter a new task..."
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
