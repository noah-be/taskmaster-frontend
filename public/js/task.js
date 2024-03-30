document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    addButton.addEventListener('click', addTask);

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
            .then(data => {
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