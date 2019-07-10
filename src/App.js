import React, {useState} from 'react'
import TaskList from './TaskList'
import TaskEditor from './TaskEditor'


function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  return (
    <div>
      <TaskList tasks={tasks} onRequestEdit={task => {
        setEditingTask({...task})
      }} onRequestDelete={id => {
        setTasks(tasks => {
          const newTasks = tasks.filter(task => task.id !== id)

          return newTasks
        })
      }}/>
      <TaskEditor task={editingTask} onSave={task => {
        if(task.id === null)
        {
          setTasks(tasks => {
            const newTasks = [...tasks]
            newTasks.push({
              id: (new Date()).getSeconds(),
              name: task.name
            })
        
            return newTasks
          })
        } else {
          setEditingTask(null)
          setTasks(tasks => {
            const newTasks = [...tasks]
            for(let i = 0; i < newTasks.length; i++)
            {
              if(newTasks[i].id === task.id)
              {
                newTasks[i].name = task.name
                break
              }
            }
        
            return newTasks
          })
        }
      }}/>
    </div>
  );
}

export default App
