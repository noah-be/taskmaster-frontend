<template>
  <div id="new-task-form">
    <input
      type="text"
      id="task-input"
      v-model="task"
      placeholder="Enter task..."
    />
    <select id="priority-input" v-model="priority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button id="add-task-btn" @click="addTask">Add Task</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: "",
      priority: "Medium",
    };
  },
  methods: {
    addTask() {
      // TODO: Handle adding a new task
    },
  },
};
</script>
