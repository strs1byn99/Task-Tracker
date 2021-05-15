import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const BASE_URL = "http://localhost:5000/tasks"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // effect during the page loading
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch All Tasks
  const fetchTasks = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()
    return data
  }

  // Fetch Single Task
  const fetchTask = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })
    const newTask = await res.json()
    // const id = tasks.length + 1
    // const newTask = { id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    // make changes on the Server
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    })
    // make changes on UI
    setTasks(tasks.filter((each) => each.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    // make changes on the Server
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask)
    })
    // make changes on UI
    const data = await res.json()
    setTasks(tasks.map((each) => 
    each.id === id ? 
    { ...each, reminder: data.reminder} : each))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} 
        showAddTask={showAddTask} />
        {/* MOVED TO BELOW FOR IN-PAGE ROUTING */}
        {/* showAddTask ? <AddTask /> : Do Nothing */}
        {/* {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? 
          <Tasks tasks={tasks} 
            onDelete={deleteTask}
            onToggle={toggleReminder} />
          : 'No Tasks To Show'} */}
        <Route path='/' exact render={(props) => (
          <div>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? 
              <Tasks tasks={tasks} 
                onDelete={deleteTask}
                onToggle={toggleReminder} />
              : 'No Tasks To Show'}
          </div>
         )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

/* If using a Component Class instead of a function,
   need to import React from 'react'
   class App extends React.Component {}
*/
