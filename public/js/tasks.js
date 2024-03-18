function toggleTask(index) {
    const table = document.getElementById('todoTable');
    const taskRow = table.rows[index + 1];
    const checkbox = taskRow.querySelector('input[type="checkbox"]');
    const isDone = checkbox.checked;

    fetch('/tasks/toggle-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: index, done: isDone }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const priority = data.task.priority;
                updateTaskRowAppearance(taskRow, isDone, priority);
            } else {
                console.error('Task update was not successful.');
                checkbox.checked = !isDone;
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            checkbox.checked = !isDone;
        });
}


function updateTaskRowAppearance(taskRow, isDone, priority) {
    taskRow.classList.remove('done', 'not-done-low', 'not-done-normal', 'not-done-high');

    if (isDone) {
        taskRow.classList.add('done');
    } else {
        taskRow.classList.add(`not-done-${priority}`);
    }
}



function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');

    if (taskInput.value.trim() === '') {
        alert("Please enter a task");
        return;
    }

    const task = {
        task: taskInput.value,
        date: new Date().toLocaleDateString(),
        priority: priorityInput.value,
        done: false
    };

    fetch('/tasks/add-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            appendTaskToTable(data.task, data.index);
            taskInput.value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function appendTaskToTable(task, index) {
    const table = document.getElementById('todoTable');
    const row = table.insertRow(-1);

    const priorityClass = `not-done-${task.priority}`;
    row.classList.add('task-row', priorityClass);

    const isChecked = task.done ? 'checked' : '';

    row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td>${task.priority}</td>
        <td><input type="checkbox" ${isChecked} onchange="toggleTask(${index}, this)"></td>
    `;
}



