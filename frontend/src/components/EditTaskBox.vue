<template>
  <div class="edit-task-modal">
    <div class="edit-task-modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Edit Task</h2>
      <form>
        <div>
          <label for="edit-task-title">Title:</label>
          <input type="text" id="edit-task-title" v-model="taskCopy.title" />
        </div>
        <div>
          <label for="edit-task-description">Description:</label>
          <textarea
            id="edit-task-description"
            v-model="taskCopy.description"
          ></textarea>
        </div>
        <div>
          <label for="edit-task-due-date">Due Date:</label>
          <input
            type="date"
            id="edit-task-due-date"
            v-model="taskCopy.dueDate"
          />
        </div>
        <div>
          <label for="edit-task-priority">Priority:</label>
          <select id="edit-task-priority" v-model="taskCopy.priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="button" @click="saveChanges">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      taskCopy: { ...this.task },
    };
  },
  methods: {
    saveChanges() {
      this.$emit("update-task", this.taskCopy);
      this.$emit("close");
    },
  },
};
</script>
