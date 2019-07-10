class Task {
	id: number;
	name: string;
	position: number = 0;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name
	}
}

export default Task