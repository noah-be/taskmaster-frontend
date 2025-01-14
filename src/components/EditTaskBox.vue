<template>
  <v-dialog
    :model-value="taskStore.isEditDialogVisible"
    max-width="500"
    @update:model-value="taskStore.closeEditDialog"
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
              v-model="taskCopy.title"
              :placeholder="$t('components.editTaskBox.editTaskDialog.taskTitlePlaceholder')"
              outlined
              dense
              ref="titleField"
            ></v-text-field>
          </div>

          <div>
            <label for="task-description">{{ $t('components.editTaskBox.editTaskDialog.taskDescriptionLabel') }}</label>
            <v-textarea
              id="task-description"
              v-model="taskCopy.description"
              :placeholder="$t('components.editTaskBox.editTaskDialog.taskDescriptionPlaceholder')"
              outlined
              dense
              ref="descriptionField"
            ></v-textarea>
          </div>

          <div>
            <label for="task-due-date">{{ $t('components.editTaskBox.editTaskDialog.taskDueDateLabel') }}</label>
            <v-text-field id="task-due-date" v-model="taskCopy.dueDate" type="date" outlined dense ref="dueDateField"></v-text-field>
          </div>

          <div>
            <label for="task-priority">{{ $t('components.editTaskBox.editTaskDialog.taskPriorityLabel') }}</label>
            <v-select
              id="task-priority"
              v-model="taskCopy.priority"
              :items="[
                $t('components.editTaskBox.editTaskDialog.priorityOptions.high'),
                $t('components.editTaskBox.editTaskDialog.priorityOptions.medium'),
                $t('components.editTaskBox.editTaskDialog.priorityOptions.low')
              ]"
              outlined
              dense
              ref="prioritySelect"
            ></v-select>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="error" @click="deleteTask" ref="deleteButton" aria-label="Delete Task">{{
          $t('components.editTaskBox.editTaskDialog.deleteButton')
        }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="saveChanges" ref="saveButton" aria-label="Save Changes">{{
          $t('components.editTaskBox.editTaskDialog.saveButton')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const taskCopy = computed(() => {
  const task = taskStore.tasks.find(t => t.id === taskStore.currentTaskId);
  return task ? { ...task } : {};
});

function saveChanges() {
  taskStore.updateTask(taskStore.currentTaskId, taskCopy.value);
  taskStore.closeEditDialog();
}

function deleteTask() {
  taskStore.deleteTask(taskStore.currentTaskId);
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
