<template>
  <v-dialog
    :model-value="!!taskStore.currentTaskId"
    @update:model-value="
      value => {
        if (!value) taskStore.currentTaskId = null;
      }
    "
    max-width="500"
    role="dialog"
    aria-labelledby="edit-task-title"
    aria-describedby="edit-task-description"
  >
    <v-card>
      <v-card-title id="edit-task-title">
        <span class="text-h6">{{ $t('components.editTaskBox.editTaskDialog.title') }}</span>
      </v-card-title>

      <v-card-text id="edit-task-description">
        <v-form>
          <div>
            <label for="task-title">{{ $t('components.editTaskBox.editTaskDialog.taskTitleLabel') }}</label>
            <v-text-field
              id="task-title"
              ref="taskTitle"
              v-model="taskCopy.title"
              :placeholder="$t('components.editTaskBox.editTaskDialog.taskTitlePlaceholder')"
              outlined
              dense
            ></v-text-field>
          </div>

          <div>
            <label for="task-description">{{ $t('components.editTaskBox.editTaskDialog.taskDescriptionLabel') }}</label>
            <v-textarea
              id="task-description"
              ref="taskDescription"
              v-model="taskCopy.description"
              :placeholder="$t('components.editTaskBox.editTaskDialog.taskDescriptionPlaceholder')"
              outlined
              dense
            ></v-textarea>
          </div>

          <div>
            <label for="task-due-date">{{ $t('components.editTaskBox.editTaskDialog.taskDueDateLabel') }}</label>
            <v-text-field id="task-due-date" ref="taskDueDate" v-model="taskCopy.dueDate" type="date" outlined dense></v-text-field>
          </div>

          <div>
            <label for="task-priority">{{ $t('components.editTaskBox.editTaskDialog.taskPriorityLabel') }}</label>
            <v-select
              id="task-priority"
              ref="taskPriority"
              v-model="taskCopy.priority"
              :items="[
                $t('components.editTaskBox.editTaskDialog.priorityOptions.high'),
                $t('components.editTaskBox.editTaskDialog.priorityOptions.medium'),
                $t('components.editTaskBox.editTaskDialog.priorityOptions.low')
              ]"
              outlined
              dense
            ></v-select>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="error" @click="deleteTask" aria-label="Delete Task">{{ $t('components.editTaskBox.editTaskDialog.deleteButton') }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="saveChanges" aria-label="Save Changes">{{ $t('components.editTaskBox.editTaskDialog.saveButton') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const taskStore = useTaskStore();
const taskCopy = ref({});

watch(
  () => taskStore.currentTaskId,
  () => {
    const selectedTask = taskStore.tasks.find(t => t._id === taskStore.currentTaskId);
    taskCopy.value = selectedTask ? { ...selectedTask } : {};
  },
  { immediate: true }
);

function saveChanges() {
  taskStore.updateTask(taskStore.currentTaskId, taskCopy.value, t);
  taskStore.closeEditDialog();
}

function deleteTask() {
  taskStore.deleteTask(taskStore.currentTaskId, t);
  taskStore.closeEditDialog();
}
</script>

<style scoped>
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
