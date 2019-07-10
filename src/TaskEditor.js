import React, {useState, useEffect} from 'react'

function TaskEditor({task, onSave})
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

                const updatedTask = {
                    id: task === null ? null : task.id,
                    name
                }
                onSave(updatedTask)
            }}>{task === null ? 'Add' : 'Save'}</button>
        </div>
    )
}

export default TaskEditor