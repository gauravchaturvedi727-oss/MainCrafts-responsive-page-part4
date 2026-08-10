const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const totalTasks = document.getElementById("totalTasks");
const completedTasks =
    document.getElementById("completedTasks");
const pendingTasks =
    document.getElementById("pendingTasks");
const taskCount =
    document.getElementById("taskCount");

let tasks =
    JSON.parse(localStorage.getItem("maincraftTasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "maincraftTasks",
        JSON.stringify(tasks)
    );
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText =
        taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";
    renderTasks();
});


function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });
    saveTasks();
    renderTasks();
}
function editTask(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (!task) {
        return;
    }

    const updatedText =
        prompt("Edit your task:", task.text);

    if (updatedText === null) {
        return;
    }

    const newText =
        updatedText.trim();

    if (newText === "") {
        alert("Task cannot be empty.");
        return;
    }
    task.text = newText;
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (!task) {
        return;
    }
    task.completed =
        !task.completed;
    saveTasks();
    renderTasks();

}

function renderTasks() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();
    const filter =
        filterSelect.value;
    const filteredTasks =
        tasks.filter(function (task) {


            const matchesSearch =
                task.text
                    .toLowerCase()
                    .includes(searchText);

            let matchesFilter = true;


            if (filter === "completed") {
                matchesFilter =
                    task.completed === true;
            }

            if (filter === "pending") {
                matchesFilter =
                    task.completed === false;
            }
            return (
                matchesSearch &&
                matchesFilter
            );

        });
    taskList.innerHTML = "";
    filteredTasks.forEach(function (task) {
        const taskBox =
            document.createElement("div");
        taskBox.classList.add("task-item");


        if (task.completed) {
            taskBox.classList.add(
                "completed-task"
            );
        }
        taskBox.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">
                ${escapeHTML(task.text)}
            </span>
            <div class="task-buttons">
                <button
                    class="edit-task"
                    onclick="editTask(${task.id})"
                >
                    Edit
                </button>
                <button
                    class="delete-task"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>
            </div>
        `;
        taskList.appendChild(taskBox);
    });

    if (filteredTasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }


    taskCount.textContent =
        filteredTasks.length +
        (filteredTasks.length === 1
            ? " task"
            : " tasks");

    updateStatistics();

}

searchInput.addEventListener(
    "input",
    renderTasks
);

filterSelect.addEventListener(
    "change",
    renderTasks
);

function updateStatistics() {
    const completed =
        tasks.filter(function (task) {
            return task.completed === true;
        }).length;
    const pending =
        tasks.length - completed;
    totalTasks.textContent =
        tasks.length;
    completedTasks.textContent =
        completed;
    pendingTasks.textContent =
        pending;
}

function escapeHTML(text) {
    const div =
        document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

renderTasks();