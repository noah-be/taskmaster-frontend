document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    addButton.addEventListener('click', addTask);

    window.editTask = function (taskElement) {
        const taskId = taskElement.getAttribute('data-task-id');
        const taskTitle = taskElement.getAttribute('data-task-title');
        const taskDescription = taskElement.getAttribute('data-task-description');
        const taskDueDate = taskElement.getAttribute('data-task-due-date');
        const taskPriority = taskElement.getAttribute('data-task-priority');

        document.getElementById('edit-task-id').value = taskId;
        document.getElementById('edit-task-title').value = taskTitle;
        document.getElementById('edit-task-description').value = taskDescription;
        document.getElementById('edit-task-due-date').value = taskDueDate;
        document.getElementById('edit-task-priority').value = taskPriority;

        document.getElementById('edit-task-modal').style.display = 'block';
    }

    window.closeEditModal = function () {
        document.getElementById('edit-task-modal').style.display = 'none';
    }

    window.submitEditTask = function () {
        const taskId = document.getElementById('edit-task-id').value;
        const taskTitle = document.getElementById('edit-task-title').value;
        const taskDescription = document.getElementById('edit-task-description').value;
        const taskDueDate = document.getElementById('edit-task-due-date').value;
        const taskPriority = document.getElementById('edit-task-priority').value;

        const updatedTask = {
            id: taskId,
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority
        };

        window.closeEditModal();
    }




    async function addTask() {
        const taskTitleInput = document.getElementById('task-input');
        const taskPrioritySelect = document.getElementById('priority-input');

        if (taskTitleInput.value.trim() === '') {
            alert('Please enter a task title.');
            return;
        }

        addButton.disabled = true;

        const taskData = {
            title: taskTitleInput.value,
            priority: taskPrioritySelect.value
        };

        performFetch('/api/task/add', 'POST', JSON.stringify(taskData))
            .then(() => {
                updateTaskTable();
                taskTitleInput.value = '';
                taskPrioritySelect.value = 'Medium';
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            })
            .finally(() => {
                addButton.disabled = false;
            });
    }

    function updateTaskTable() {
        fetch('/api/task/table', {})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('todo-table-container').innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching the task table:', error);
            });
    }

    async function performFetch(url, method, body) {
        return fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })
            .then(response => {
                console.log("Response: " + response.statusText);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
    }
});