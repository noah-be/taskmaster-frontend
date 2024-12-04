<template>
  <v-container>
    <v-row align="stretch" class="new-task-form">
      <v-col cols="6">
        <v-text-field v-model="title" label="Enter task..." outlined dense placeholder="Task title"></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-select v-model="priority" :items="['Low', 'Medium', 'High']" label="Priority" outlined dense></v-select>
      </v-col>

      <v-col cols="2">
        <v-text-field v-model="dueDate" label="Due Date" type="date" outlined dense></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-btn color="primary" block class="h-100" @click="addTask"> Add Task </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      priority: 'Medium',
      dueDate: ''
    };
  },
  methods: {
    async addTask() {
      if (!this.title.trim() || !this.dueDate) {
        alert('Task title and due date are required.');
        return;
      }

      try {
        const response = await fetch('/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            title: this.title,
            priority: this.priority,
            dueDate: this.dueDate
          })
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        const newTask = await response.json();
        this.$emit('task-added', newTask);
        this.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.title = '';
      this.priority = 'Medium';
      this.dueDate = '';
    }
  }
};
</script>

<style scoped>
.v-input__control,
.v-btn {
  height: 56px !important;
}
</style>
