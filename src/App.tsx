import React, {useReducer, useState, useEffect} from 'react'
import Task from './Task'
import TaskAction from './TaskAction'
import TaskList from './TaskList'
import TaskEditor from './TaskEditor'



const taskReducer = (tasks: Task[], action: TaskAction) => {
	if (action.type === 'ADD') {
		const newTasks: Task[] = [...tasks];
		const newTask: Task = new Task((new Date()).getTime(), action.payload.name);
		newTask.position = newTasks.length + 1;
		newTasks.push(newTask);

		return newTasks
	} else if (action.type === 'EDIT') {
		const newTasks: Task[] = [...tasks];
		for (let i: number = 0; i < newTasks.length; i++) {
			const task: Task = newTasks[i];
			if (task.id === action.payload.id) {
				newTasks[i].name = action.payload.name;
				break
			}
		}

		return newTasks
	} else if (action.type === 'DELETE') {
		let newTasks = tasks.filter((task: Task) => task.id !== action.payload.id);

		for (let i: number = 0; i < newTasks.length; i++) {
			newTasks[i].position = i + 1;
		}

		console.log(newTasks)

		return newTasks;
	} else if (action.type === 'MOVE_UP') {
		const position = action.payload.task.position;

		if(position > 1)
		{
			const newTasks: Task[] = [...tasks];
			for (let i: number = 0; i < newTasks.length; i++) {
				const task: Task = newTasks[i];
				if(task.position === position - 1)
				{
					newTasks[i].position = position
				}else if(task.position === position)
				{
					newTasks[i].position = position - 1
				}
			}

			return newTasks;
		}

		return tasks;
	} else if (action.type === 'MOVE_DOWN') {
		const position = action.payload.task.position;

		if(position < tasks.length)
		{
			const newTasks: Task[] = [...tasks];
			for (let i: number = 0; i < newTasks.length; i++) {
				const task: Task = newTasks[i];
				if(task.position === position + 1)
				{
					newTasks[i].position = position
				}else if(task.position === position)
				{
					newTasks[i].position = position + 1
				}
			}

			return newTasks;
		}
	}
	return tasks
};


const initialTasks: Task[] = [];

const saveTasksJson = localStorage.getItem('tasks') as string;
if(saveTasksJson !== null)
{
	const savedTasks: Task[] = JSON.parse(saveTasksJson);
	for(let task of savedTasks)
	{
		const savedTask = new Task(task.id, task.name);
		savedTask.position = task.position;
		initialTasks.push(savedTask);
	}
}




function App() {
	const [tasks, dispatchTaskAction] = useReducer(taskReducer, initialTasks);
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	useEffect(() => {
			console.log(tasks);
			localStorage.setItem('tasks', JSON.stringify(tasks));
		},
		[tasks]
	);

	  
	return (
		<div>
			<TaskList
				tasks={tasks}
				onRequestEdit={(task: Task) => {
					setEditingTask(task)
				}}
				onRequestDelete={(taskId: number) => {
					dispatchTaskAction(new TaskAction(
						'DELETE',
						{
							id: taskId
						}))
				}}
				onRequestMoveUp={(task: Task) => {
					dispatchTaskAction(new TaskAction(
						'MOVE_UP',
						{
							task
						}))
				}}
				onRequestMoveDown={(task: Task) => {
					dispatchTaskAction(new TaskAction(
						'MOVE_DOWN',
						{
							task
						}))
				}}/>
			<TaskEditor
				task={editingTask}
				onSave={(task: Task) => {
					setEditingTask(null)
					if (task.id === 0) {
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
