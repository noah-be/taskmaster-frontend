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
          @click="openEditBox(task)"
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

    <EditTaskBox
      v-if="showEditBox"
      :task="selectedTask"
      @update-task="updateTask"
      @close="showEditBox = false"
    />
  </div>
</template>

<script>
import EditTaskBox from "@/components/EditTaskBox.vue";

export default {
  components: {
    EditTaskBox,
  },
  data() {
    return {
      tasks: [],
      showEditBox: false,
      selectedTask: null,
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
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(
        (task) => task._id === updatedTask._id,
      );
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    },
    openEditBox(task) {
      this.selectedTask = task;
      this.showEditBox = true;
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
