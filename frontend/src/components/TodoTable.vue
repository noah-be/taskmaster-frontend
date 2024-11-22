<template>
  <div id="todo-table-container">
    <table id="todo-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in tasks"
          :key="task.id"
          :class="task.completed ? 'done' : 'not-done-' + task.priority"
        >
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.priority }}</td>
          <td>
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTaskCompletion(task.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch("/api/task/getAll", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    },
    editTask(task) {
      // TODO: Handle editing a task
    },
    toggleTaskCompletion(taskId) {
      // TODO: Handle toggling task completion
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
