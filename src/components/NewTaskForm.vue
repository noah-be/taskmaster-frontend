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
    <v-row class="align-stretch new-task-form">
      <v-col cols="6">
        <v-text-field
          id="new-task-title"
          ref="newTaskTitle"
          v-model="title"
          :placeholder="$t('components.newTaskForm.taskTitlePlaceholder')"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select id="new-task-priority" ref="newTaskPriority" v-model="priority" :items="priorityOptions" outlined dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-text-field
          id="new-task-due-date"
          ref="newTaskDueDate"
          v-model="dueDate"
          :placeholder="$t('components.newTaskForm.dueDatePlaceholder')"
          type="date"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn ref="addTaskBtn" :disabled="!title" color="primary" block class="h-100" @click="handleAddTask" aria-label="Add Task">
          {{ $t('components.newTaskForm.addTaskButton') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const taskStore = useTaskStore();

const title = ref('');
const dueDate = ref(new Date().toISOString().split('T')[0]);
const priorityOptions = [
  t('components.newTaskForm.priorityOptions.low'),
  t('components.newTaskForm.priorityOptions.medium'),
  t('components.newTaskForm.priorityOptions.high')
];
const priority = ref(priorityOptions[1]);

async function handleAddTask() {
  await taskStore.addTask({
    title: title.value,
    priority: priority.value,
    dueDate: dueDate.value
  });

  title.value = '';
  priority.value = t('components.newTaskForm.priorityOptions.medium');
  dueDate.value = new Date().toISOString().split('T')[0];
}
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
