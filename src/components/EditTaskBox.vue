<template>
  <v-dialog
    :model-value="isDialogVisible"
    max-width="500"
    @update:model-value="closeDialog"
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

<style scoped>
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
