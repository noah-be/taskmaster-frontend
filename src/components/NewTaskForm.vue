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
        <v-btn color="primary" block class="h-100" @click="handleAddTask" aria-label="Add Task">
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
const dueDate = ref('');
const priorityOptions = [
  t('components.newTaskForm.priorityOptions.low'),
  t('components.newTaskForm.priorityOptions.medium'),
  t('components.newTaskForm.priorityOptions.high')
];
const priority = ref(t('components.newTaskForm.priorityOptions.medium'));

async function handleAddTask() {
  if (!title.value.trim() || !dueDate.value) {
    alert(t('components.newTaskForm.errorMessage'));
    return;
  }

  await taskStore.addTask({
    title: title.value,
    priority: priority.value,
    dueDate: dueDate.value
  });

  resetForm();
}

function resetForm() {
  title.value = '';
  priority.value = t('components.newTaskForm.priorityOptions.medium');
  dueDate.value = '';
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
