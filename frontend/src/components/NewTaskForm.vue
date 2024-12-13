<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <label for="task-title" class="form-label">Task Title</label>
      </v-col>
      <v-col cols="2">
        <label for="task-priority" class="form-label">Priority</label>
      </v-col>
      <v-col cols="2">
        <label for="due-date" class="form-label">Due Date</label>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <v-row align="stretch" class="new-task-form">
      <v-col cols="6">
        <v-text-field id="task-title" v-model="title" placeholder="Task title" outlined dense></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select id="task-priority" v-model="priority" :items="['Low', 'Medium', 'High']" outlined dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-text-field id="due-date" v-model="dueDate" placeholder="Select due date" type="date" outlined dense></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" block class="h-100" @click="addTask" aria-label="Add Task"> Add Task </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.form-label {
  font-weight: bold;
  font-size: large;
  margin-left: 10px;
  display: block;
}
</style>

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
