import { useEffect, useState } from 'react'
import AddTask from './components/AddTask';
import DeleteTask from './components/DeleteTask';
import './App.css'
import axios from 'axios'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setloading] = useState(false)

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const { data: tasksData } = await axios.get("http://localhost:9000/task")

        setTasks(tasksData)

        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching tasks:', error);
      }
    }
    fetchData();
  }, [])

  const addTask = async () => {
    if (task.trim() === '') return;

    try {
      const { data: newTask } = await axios.post(
        'http://localhost:9000/task',
        {
          task: task.trim(),
        }
      );

      setTasks([...tasks, newTask]);
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/task/${id}`);

      setTasks((prevTasks) =>
        prevTasks.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditValue(item.task);
  };

  const updateTask = async () => {
    try {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:9000/task/${editId}`,
        {
          task: editValue.trim(),
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item.id === editId ? updatedTask : item
        )
      );

      setEditId(null);
      setEditValue("");

    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        To Do List
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-6">

          <AddTask task={task} setTask={setTask} addTask={addTask} />

          {loading ? (
            <p>Loading...</p>
          ) : (

            <ul className="list-group">
              {tasks.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editId === item.id ? (
                    <input
                      type="text"
                      className="form-control me-2"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <span>{item.task}</span>
                  )}

                  <div className="d-flex gap-2">
                    <button
                      className={`btn btn-sm ${editId === item.id ? "btn-success" : "btn-warning"
                        }`}
                      onClick={() =>
                        editId === item.id ? updateTask() : handleEdit(item)
                      }
                    >
                      {editId === item.id ? "Save" : "Edit"}
                    </button>

                    <DeleteTask onDelete={() => deleteTask(item.id)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;