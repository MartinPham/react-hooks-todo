import React, {useReducer, useState} from 'react'
import Task from './Task'
import TaskAction from './TaskAction'
import TaskList from './TaskList'
import TaskEditor from './TaskEditor'

const taskReducer = (tasks: Task[], action: TaskAction) => {
  if(action.type === 'ADD')
  {
    const newTasks: Task[] = [...tasks]
    const newTask: Task = new Task((new Date()).getSeconds(), action.payload.name)
    newTasks.push(newTask)

    return newTasks
  }else if(action.type === 'EDIT')
  {
    const newTasks: Task[] = [...tasks]
    for(let i: number = 0; i < newTasks.length; i++)
    {
      const task: Task = newTasks[i]
      if(task.id === action.payload.id)
      {
        newTasks[i].name = action.payload.name
        break
      }
    }

    return newTasks
  }else if(action.type === 'DELETE')
  {
    const newTasks: Task[] = tasks.filter((task: Task) => task.id !== action.payload.id)

    return newTasks
  }
  return tasks
}

const initialTasks: Task[] = [
];


function App() {
  const [tasks, dispatchTaskAction] = useReducer(taskReducer, initialTasks)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  return (
    <div>
      <TaskList tasks={tasks} onRequestEdit={(task: Task) => {
        setEditingTask(task)
      }} onRequestDelete={(taskId: number) => {
        dispatchTaskAction(new TaskAction(
          'DELETE',
          {
            id: taskId
          }))
      }}/>
      <TaskEditor task={editingTask} onSave={(task: Task) => {
        if(task.id === 0)
        {
          dispatchTaskAction(new TaskAction(
            'ADD',
            {
              name: task.name
            }))
        } else {
          dispatchTaskAction(new TaskAction(
            'EDIT',
            {
              id: task.id,
              name: task.name
            }))
        }
      }}/>
    </div>
  );
}

export default App
