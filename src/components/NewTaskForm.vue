<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <label for="task-title" class="form-label">{{ $t('components.newTaskForm.taskTitleLabel') }}</label>
      </v-col>
      <v-col cols="2">
        <label for="task-priority" class="form-label">{{ $t('components.newTaskForm.priorityLabel') }}</label>
      </v-col>
      <v-col cols="2">
        <label for="due-date" class="form-label">{{ $t('components.newTaskForm.dueDateLabel') }}</label>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <v-row align="stretch" class="new-task-form">
      <v-col cols="6">
        <v-text-field id="task-title" v-model="title" :placeholder="$t('components.newTaskForm.taskTitlePlaceholder')" outlined dense></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select id="task-priority" v-model="priority" :items="priorityOptions" outlined dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-text-field id="due-date" v-model="dueDate" :placeholder="$t('components.newTaskForm.dueDatePlaceholder')" type="date" outlined dense></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" block class="h-100" @click="addTask" aria-label="Add Task">{{ $t('components.newTaskForm.addTaskButton') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      dueDate: '',
      priorityOptions: [
        this.$t('components.newTaskForm.priorityOptions.low'),
        this.$t('components.newTaskForm.priorityOptions.medium'),
        this.$t('components.newTaskForm.priorityOptions.high')
      ],
      priority: this.$t('components.newTaskForm.priorityOptions.medium')
    };
  },
  methods: {
    async addTask() {
      if (!this.title.trim() || !this.dueDate) {
        alert(this.$t('components.newTaskForm.errorMessage'));
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
          throw new Error(this.$t('components.newTaskForm.taskAddedFailure'));
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
      this.priority = this.$t('components.newTaskForm.priorityOptions.medium');
      this.dueDate = '';
    }
  }
};
</script>

<style scoped>
.form-label {
  font-weight: bold;
  font-size: large;
  margin-left: 10px;
  display: block;
}
.v-input__control,
.v-btn {
  height: 56px !important;
}
</style>
