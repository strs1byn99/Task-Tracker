import Task from "./Task"

const Tasks = ({ tasks, onEdit, onDelete, onToggle }) => {
  return (
    <>
      {/* tasks is from this.state */}
      {tasks.map((t) => (
        <Task key={t.id} task={t} onEdit={onEdit} onDelete={onDelete}
          onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks
