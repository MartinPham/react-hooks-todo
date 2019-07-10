import React from 'react'
import Task from './Task'
import styles from './TaskList.module.css'


type props = {
	tasks: Task[],
	onRequestEdit: (task: Task) => void,
	onRequestMoveUp: (task: Task) => void,
	onRequestMoveDown: (task: Task) => void,
	onRequestDelete: (taskId: number) => void,
}

function TaskList({ tasks, onRequestEdit, onRequestMoveUp, onRequestMoveDown, onRequestDelete }: props) {
	return (
		<ul className={styles.list}>
			{tasks.map(task => (
				<li key={task.id} className={styles.task} style={{
					top: task.position * 30
				}}>
					<button onClick={() => onRequestMoveUp(task)}>▲</button>
					<button onClick={() => onRequestMoveDown(task)}>▼</button>
					&nbsp; &nbsp;
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