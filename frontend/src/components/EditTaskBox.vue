<template>
  <div id="edit-task-modal" class="edit-task-modal" v-if="isModalVisible">
    <div class="edit-task-modal-content">
      <span class="close" @click="closeEditModal">&times;</span>
      <h2>Edit Task</h2>
      <form id="form">
        <input type="hidden" v-model="task.id" />

        <div>
          <label for="edit-task-title">Title:</label>
          <input
            type="text"
            id="edit-task-title"
            v-model="task.title"
            name="title"
          />
        </div>

        <div>
          <label for="edit-task-description">Description:</label>
          <textarea
            id="edit-task-description"
            v-model="task.description"
            name="description"
          ></textarea>
        </div>

        <div>
          <label for="edit-task-due-date">Due Date:</label>
          <input
            type="date"
            id="edit-task-due-date"
            v-model="task.dueDate"
            name="dueDate"
          />
        </div>

        <div>
          <label for="edit-task-priority">Priority:</label>
          <select
            id="edit-task-priority"
            v-model="task.priority"
            name="priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button type="button" id="delete-task-btn" @click="deleteTask">
          Delete
        </button>
        <button type="button" id="save-edit-task-btn" @click="submitEditTask">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeEditModal() {
      this.$emit("close");
    },
    deleteTask() {
      this.$emit("delete-task", this.task.id);
    },
    submitEditTask() {
      this.$emit("save-task", { ...this.task });
    },
  },
};
</script>
