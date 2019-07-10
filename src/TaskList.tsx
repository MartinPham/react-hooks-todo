import React from 'react'
import Task from './Task'

type props = {
	tasks: Task[],
	onRequestEdit: (task: Task) => void,
	onRequestDelete: (taskId: number) => void,
}

function TaskList({ tasks, onRequestEdit, onRequestDelete }: props) {
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