import AddTask from './AddTask';
import { useState } from "react";

function EditTask({ task, onEdit, updateState }) {
  const [text, setText] = useState(task.text)
  const [day, setDay] = useState(task.day)
  const [reminder, setReminder] = useState(task.reminder)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text || !day) {
      alert("Invalid Input")
      return
    }
    if (text.length > 24) {
      alert("Exceeds 24 characters")
      return
    }
    // TODO : no length limit

    const updated_dict = {
      text: text,
      day: day,
      reminder: reminder
    }
    onEdit(task.id , updated_dict)
    updateState(updated_dict)
  }
  return (
      <>
        <form className='add-form' onSubmit={onSubmit}>
          <div className='form-control'>
            <label>Task</label>
            <input type="text" placeholder="Add Task" value={text}
            onChange={(e) => setText(e.target.value)} />
          </div>
          <div className='form-control'>
            <label>Day & Time</label>
            <input type="text" placeholder="Add Day & Time" value={day}
            onChange={(e) => setDay(e.target.value)} />
          </div>
          <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input type="checkbox" value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
            checked={reminder} />
          </div>

          <input className="btn btn-block" type="submit" value="Save Task" />
        </form>
      </>
    )
}

export default EditTask