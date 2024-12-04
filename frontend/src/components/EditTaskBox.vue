<template>
  <v-dialog :model-value="isDialogVisible" max-width="500" @update:model-value="closeDialog">
    <v-card>
      <v-card-title>
        <span class="text-h6">Edit Task</span>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field v-model="taskCopy.title" label="Title" outlined dense></v-text-field>
          <v-textarea v-model="taskCopy.description" label="Description" outlined dense></v-textarea>
          <v-text-field v-model="taskCopy.dueDate" label="Due Date" type="date" outlined dense></v-text-field>
          <v-select v-model="taskCopy.priority" :items="['High', 'Medium', 'Low']" label="Priority" outlined dense></v-select>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="error" @click="deleteTask">Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="saveChanges">Save Changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true },
    isDialogVisible: { type: Boolean, required: true }
  },
  watch: {
    task: {
      immediate: true,
      deep: true,
      handler(newTask) {
        this.taskCopy = { ...newTask, dueDate: this.formatDateForInput(newTask.dueDate) };
      }
    }
  },
  methods: {
    saveChanges() {
      this.$emit('save-task', this.taskCopy);
      this.closeDialog();
    },
    deleteTask() {
      this.$emit('delete-task', this.taskCopy._id);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit('update:is-dialog-visible', false);
    },
    formatDateForInput(date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate)) return '';
      return parsedDate.toISOString().split('T')[0];
    }
  }
};
</script>
