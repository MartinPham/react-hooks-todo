import React, {useReducer, useState} from 'react'
import TaskList from './TaskList'
import TaskEditor from './TaskEditor'

const taskReducer = (tasks, action) => {
  if(action.type === 'ADD')
  {
    const newTasks = [...tasks]
    newTasks.push({
      id: (new Date()).getSeconds(),
      name: action.payload.name
    })

    return newTasks
  }else if(action.type === 'EDIT')
  {
    const newTasks = [...tasks]
    for(let i = 0; i < newTasks.length; i++)
    {
      if(newTasks[i].id === action.payload.id)
      {
        newTasks[i].name = action.payload.name
        break
      }
    }

    return newTasks
  }else if(action.type === 'DELETE')
  {
    const newTasks = tasks.filter(task => task.id !== action.payload.id)

    return newTasks
  }
  return tasks
}

const initialTasks = [
];

function App() {
  const [tasks, dispatchTaskAction] = useReducer(taskReducer, initialTasks)
  const [editingTask, setEditingTask] = useState(null)

  return (
    <div>
      <TaskList tasks={tasks} onRequestEdit={task => {
        setEditingTask({...task})
      }} onRequestDelete={id => {
        dispatchTaskAction({
          type: 'DELETE',
          payload: {
            id
          }
        })
      }}/>
      <TaskEditor task={editingTask} onSave={task => {
        if(task.id === null)
        {
          dispatchTaskAction({
            type: 'ADD',
            payload: {
              name: task.name
            }
          })
        } else {
          dispatchTaskAction({
            type: 'EDIT',
            payload: {
              id: task.id,
              name: task.name
            }
          })
        }
      }}/>
    </div>
  );
}

export default App
