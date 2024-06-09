const db = new Dexie('To-do List')
db.version(1).stores({ todos: '++id, todo' })

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");


form.onsubmit = async (event) => {
	event.preventDefault();
	const todo = input.value;
	await db.todos.add({ todo })
	await getTodos()
	form.reset()
};


const getTodos = async () => {
	const allTodos = await db.todos.reverse().toArray()
	list_el.innerHTML = allTodos.map(todo => `
	
	<div class="task">
	<div class="content">
	<input id="edit" class="text" readonly="readonly" type="text" value= ${todo.todo}>
	</div>
	<div class="actions">
	<button class="delete" onclick="deleteTodo(event, ${todo.id})">Delete</button>
	</div>
	</div>
	`).join("")

}
window.onload = getTodos


const deleteTodo = async (event, id) => {
	await db.todos.delete(id)
	await getTodos()
}
