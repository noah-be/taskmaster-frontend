function addTask() {
    const taskData = {
        title: document.getElementById('taskInput').value,
        priority: document.getElementById('priorityInput').value
    };

    fetch('/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task added:', data);
            const table = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            const titleCell = newRow.insertCell();
            titleCell.textContent = data.title;

            const priorityCell = newRow.insertCell();
            priorityCell.textContent = data.priority;

            document.getElementById('taskInput').value = '';
            document.getElementById('priorityInput').value = 'Medium';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}