<template>
  <div id="new-task-form">
    <input
      type="text"
      id="task-input"
      v-model="title"
      placeholder="Enter task..."
    />
    <select id="priority-input" v-model="priority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <input type="date" id="due-date-input" v-model="dueDate" />
    <button id="add-task-btn" @click="addTask">Add Task</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      priority: "Medium",
      dueDate: "",
    };
  },
  methods: {
    async addTask() {
      if (!this.title.trim() || !this.dueDate) {
        alert("Task title and due date are required.");
        return;
      }

      try {
        const response = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: this.title,
            priority: this.priority,
            dueDate: this.dueDate,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        const newTask = await response.json();
        this.$emit("task-added", newTask);
        this.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.title = "";
      this.priority = "Medium";
      this.dueDate = "";
    },
  },
};
</script>
