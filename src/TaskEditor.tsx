import React, {useState, useEffect} from 'react'
import Task from './Task'

function TaskEditor(
    {
        task, 
        onSave
    }: 
    {
        task: Task | null, 
        onSave: (task: Task) => void, 
    })
{
    const [name, setName] = useState('')

    useEffect(() => {
        if(task !== null)
        {
            setName(task.name);
        }
    }, [task])
    return (
        <div>
            <input onChange={(event) => setName(event.target.value)} value={name}/>
            <button onClick={() => {
                setName('')

                const updatedTask = new Task(
                    task === null ? 0 : task.id,
                    name
				)
                onSave(updatedTask)
            }}>{task === null ? 'Add' : 'Save'}</button>
        </div>
    )
}

export default TaskEditor