<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>
            <h2 class="text-center w-100">{{ $t('views.tasks.title') }}</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <NewTaskForm />
            <TodoTable :tasks="tasks" @edit-task="openEditDialog" @toggle-task="toggleTaskCompletion" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <EditTaskBox
      :task-id="currentTaskId"
      :is-dialog-visible="isDialogVisible"
      @update:is-dialog-visible="isDialogVisible = $event"
      @save-task="saveTaskChanges"
      @delete-task="deleteTask"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTaskStore } from '@/stores/taskStore';
import NewTaskForm from '@/components/NewTaskForm.vue';
import TodoTable from '@/components/TodoTable.vue';
import EditTaskBox from '@/components/EditTaskBox.vue';

export default {
  components: {
    NewTaskForm,
    TodoTable,
    EditTaskBox
  },
  setup() {
    const { t } = useI18n();
    const taskStore = useTaskStore();

    const isDialogVisible = ref(false);
    const currentTaskId = ref(null);

    const tasks = taskStore.tasks;

    const addTaskToList = async newTask => {
      await taskStore.addTask(newTask);
    };

    const openEditDialog = taskId => {
      currentTaskId.value = taskId;
      isDialogVisible.value = true;
    };

    const closeEditDialog = () => {
      isDialogVisible.value = false;
    };

    const deleteTask = async taskId => {
      await taskStore.deleteTask(taskId);
      closeEditDialog();
    };

    const saveTaskChanges = async updatedTask => {
      await taskStore.updateTask(updatedTask.id, updatedTask);
      closeEditDialog();
    };

    const toggleTaskCompletion = async taskId => {
      await taskStore.toggleTaskCompletion(taskId);
    };

    onMounted(() => taskStore.fetchTasks());

    return {
      tasks,
      currentTaskId,
      addTaskToList,
      openEditDialog,
      closeEditDialog,
      deleteTask,
      saveTaskChanges,
      toggleTaskCompletion
    };
  }
};
</script>
