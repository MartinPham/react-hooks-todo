import React, {useEffect, useState} from 'react'
import Task from './Task'

type props = {
	task: Task | null,
	onSave: (task: Task) => void,
}

function TaskEditor({ task, onSave }: props) {
	const [name, setName] = useState('');

	useEffect(() => {
		if (task !== null) {
			setName(task.name);
		}
	}, [task]);
	return (
		<div>
			<input onChange={(event) => setName(event.target.value)} value={name}/>
			<button onClick={() => {
				setName('');

				const updatedTask = new Task(
					task === null ? 0 : task.id,
					name
				);
				onSave(updatedTask)
			}}>{task === null ? 'Add' : 'Save'}</button>
		</div>
	)
}

export default TaskEditor