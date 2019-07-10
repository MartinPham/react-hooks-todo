import React, {useReducer, useState, useEffect} from 'react'
import Task from './Task'
import TaskAction from './TaskAction'
import TaskList from './TaskList'
import TaskEditor from './TaskEditor'



const taskReducer = (tasks: Task[], action: TaskAction) => {
	if (action.type === 'ADD') {
		const newTasks: Task[] = [...tasks];
		const newTask: Task = new Task((new Date()).getSeconds(), action.payload.name);
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
		return tasks.filter((task: Task) => task.id !== action.payload.id);
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
		initialTasks.push(new Task(task.id, task.name))
	}
}




function App() {
	const [tasks, dispatchTaskAction] = useReducer(taskReducer, initialTasks);
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	useEffect(() => {
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
