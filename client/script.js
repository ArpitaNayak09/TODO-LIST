const API_URL = "http://localhost:3000/todos"; // Your backend URL

// Fetch and display all todos
async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    const todoList = document.getElementById("todoList");

    todoList.innerHTML = ""; // Clear previous list

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo.description}
            <button class="delete-btn" onclick="deleteTodo(${todo.t_id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Add a new todo
async function addTodo() {
    const input = document.getElementById("todoInput");
    const description = input.value.trim();
    
    if (!description) return alert("Enter a todo!"); // Prevent empty todos

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description })
    });

    input.value = ""; // Clear input field
    fetchTodos(); // Refresh list
}

// Delete a todo
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTodos(); // Refresh list
}

// Load todos when page opens
fetchTodos();
