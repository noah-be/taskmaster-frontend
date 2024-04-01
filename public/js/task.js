document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn');
    const saveEditTaskButton = document.getElementById('save-edit-task-btn');

    addButton.addEventListener('click', addTask);
    saveEditTaskButton.addEventListener('click', window.submitEditTask);

    window.toggleTaskCompletion = function(event, taskId) {
        event.stopImmediatePropagation(); // Prevent edit task modal from opening
    }

    window.editTask = function(taskElement) {
        setFormData(taskElement, true);
        document.getElementById('edit-task-modal').style.display = 'block';
    };

    window.closeEditModal = function() {
        document.getElementById('edit-task-modal').style.display = 'none';
    };

    window.submitEditTask = function() {
        const formData = getFormData();
        performFetch(`/api/task/${formData.id}`, 'PATCH', JSON.stringify(formData))
            .then(updateTaskTable)
            .catch(handleError)
            .finally(window.closeEditModal);
    };

    window.deleteTask = function() {
        const formData = getFormData();
        performFetch(`/api/task/${formData.id}`, 'DELETE', JSON.stringify(formData))
            .then(updateTaskTable)
            .catch(handleError)
            .finally(window.closeEditModal);
    };

    function setFormData(taskElement, isEditMode = false) {
        const taskId = isEditMode ? taskElement.getAttribute('data-task-id') : '';
        const taskTitle = taskElement.getAttribute('data-task-title');
        const taskDescription = taskElement.getAttribute('data-task-description');
        const taskDueDate = isEditMode ? formatDateToInput(taskElement.getAttribute('data-task-due-date')) : '';
        const taskPriority = taskElement.getAttribute('data-task-priority');

        document.getElementById('edit-task-id').value = taskId;
        document.getElementById('edit-task-title').value = taskTitle;
        document.getElementById('edit-task-description').value = taskDescription;
        document.getElementById('edit-task-due-date').value = taskDueDate;
        document.getElementById('edit-task-priority').value = taskPriority;
    }

    function getFormData() {
        return {
            id: document.getElementById('edit-task-id').value,
            title: document.getElementById('edit-task-title').value,
            description: document.getElementById('edit-task-description').value,
            dueDate: document.getElementById('edit-task-due-date').value,
            priority: document.getElementById('edit-task-priority').value
        };
    }

    function handleError(error) {
        console.error('Error:', error);
        alert(error.message);
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

        performFetch('/api/task/', 'POST', JSON.stringify(taskData))
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
        window.location.reload();
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

    function formatDateToInput(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
});