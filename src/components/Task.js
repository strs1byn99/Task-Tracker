import { FaTimes, FaEdit } from 'react-icons/fa';
import { useState } from "react";
import EditTask from "./EditTask";

function Task({ task, onEdit, onDelete, onToggle }) {
  const [editing, setEditing] = useState(false)
  const [showTask, setShowTask] = useState(task)

  function updateState(updatedTask) {
    setEditing(false);
    setShowTask({day: updatedTask.day,
      reminder: updatedTask.reminder,
      text: updatedTask.text,
      id: showTask.id})
  }

  return (
    <div className={`task ${showTask.reminder ? 'reminder' : ''}`} 
      onDoubleClick={() => onToggle(task.id)}>
      { !editing? (<>
      <h3>
        { !editing? showTask.text : <EditTask /> } 
        <span>
          <FaEdit onClick={() => setEditing(!editing)} />
          &nbsp; 
          <FaTimes style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)} />
        </span>
      </h3>
      <p>{showTask.day}</p> </>) : 
      <EditTask task={showTask} onEdit={onEdit} 
        updateState={updateState} 
      />
      }
    </div>
  )
}

export default Task
