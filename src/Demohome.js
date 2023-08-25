import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import imagesclock from "./imagesclock/clock.jpeg";

// Import the sound file
import notificationSound from "./notificationSound/1 Second Tone.mp3";

const TaskItem = ({ task, onDelete, onModify }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [modifiedTask, setModifiedTask] = useState(task.text);

  const handleModify = () => {
    setIsModifying(true);
  };

  const handleSave = () => {
    onModify(task.id, modifiedTask);
    setIsModifying(false);
    toast.info("Task modified!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  return (
    <div key={task.id} className="d-flex text-muted pt-3">
      <svg
        className="bd-placeholder-img flex-shrink-0 me-2 rounded"
        width="32"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 32x32"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <rect width="100%" height="100%" fill="#007bff"></rect>
        <text x="50%" y="50%" fill="#007bff" dy=".3em">
          32x32
        </text>
      </svg>
      <div className="flex-grow-1">
        {isModifying ? (
          <input
            type="text"
            className="form-control fade-in"
            value={modifiedTask}
            onChange={(e) => setModifiedTask(e.target.value)}
          />
        ) : (
          <p className="pb-3 mb-0 small lh-sm border-bottom">
            <strong className="d-block text-gray-dark mt-1">
              @{task.text}
            </strong>
            {task.dueDate && (
              <span className="text-muted">Due: {task.dueDate}</span>
            )}
          </p>
        )}
      </div>
      {isModifying ? (
        <button
          className="btn btn-success btn-sm me-2 fade-inn"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
          className="btn btn-success btn-sm me-2 fade-inn"
          onClick={handleModify}
        >
          Modify
        </button>
      )}
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const newTaskItem = {
      id: Date.now(),
      text: newTask.trim(),
      dueDate: newTaskDueDate,
    };

    setTasks((prevTasks) => [...prevTasks, newTaskItem]);
    setNewTask("");
    setNewTaskDueDate("");

    // Store tasks in localStorage after adding a new task
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTaskItem]));

    toast.success("New task added!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });

    // Play sound on task added
    const audio = new Audio(notificationSound);
    audio.play();
  };

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    // Store updated tasks in localStorage after deleting a task
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task.id !== taskId))
    );

    toast.error("Task deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });

    // Play sound on task deleted
    const audio = new Audio(notificationSound);
    audio.play();
  }, [tasks]);

  const handleModifyTask = useCallback((taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );

    // Store updated tasks in localStorage after modifying a task
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      )
    );

    // Play sound on task modify
    const audio = new Audio(notificationSound);
    audio.play();
  }, [tasks]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks && Array.isArray(storedTasks)) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="bg-light">
      <main className="container my-4">
        <div
          className="d-flex align-items-center p-3 my-3 text-white rounded shadow-sm"
          style={{ backgroundColor: "rgb(111,66,193)" }}
        >
          <img
            className="me-3"
            src={imagesclock}
            alt="Clock"
            width="48"
            height="38"
            style={{ borderRadius: "10px" }}
          />
          <div className="lh-1">
            <h1 className="h6 mb-0 text-white lh-1">Task Management Tool</h1>
            <small>Since 2011</small>
          </div>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-3">Add a Task</h6>
          <div className="input-group fade-in">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input
              type="datetime-local"
              className="form-control"
              placeholder="Due Date (Optional)"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
            <button
              className="btn-add-task p-3 fadeInUp"
              style={{
                backgroundColor: "rgb(111,66,193)",
                border: "none",
                color: "white",
              }}
              type="button"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onModify={handleModifyTask}
            />
          ))}
          <small className="d-block text-end mt-3">
            <Link to="#">All updates</Link>
          </small>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default Home;
