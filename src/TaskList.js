import React from 'react'


function TaskList({tasks, onRequestEdit, onRequestDelete}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
        {task.name}
        &nbsp; &nbsp; 
        <button onClick={() => onRequestEdit(task)}>Edit</button>
        <button onClick={() => onRequestDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList