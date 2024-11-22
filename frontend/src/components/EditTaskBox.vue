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
        <button type="button" id="delete-task-btn" @click="deleteTask">
          Delete
        </button>
        <button type="button" id="save-edit-task-btn" @click="saveChanges">
          Save Changes
        </button>
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
    async saveChanges() {
      try {
        const response = await fetch(`/api/task/${this.taskCopy._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(this.taskCopy),
        });

        if (!response.ok) {
          throw new Error("Failed to save task changes");
        }

        const updatedTask = await response.json();
        this.$emit("save-task", updatedTask);
        this.$emit("close");
      } catch (error) {
        console.error("Error saving task changes:", error);
        alert("Failed to save changes. Please try again.");
      }
    },
    async deleteTask() {
      try {
        const response = await fetch(`/api/task/${this.taskCopy._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        this.$emit("delete-task", this.taskCopy._id);
        this.$emit("close");
      } catch (error) {
        console.error(error);
        alert("Failed to delete task.");
      }
    },
  },
};
</script>
