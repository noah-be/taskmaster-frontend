<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>
            <h2 class="text-center w-100">To-Do List</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <NewTaskForm @task-added="addTaskToList" />
            <TodoTable :tasks="tasks" @edit-task="openEditDialog" @toggle-task="toggleTaskCompletion" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <EditTaskBox
      :task="currentTask"
      :is-dialog-visible="isDialogVisible"
      @update:is-dialog-visible="isDialogVisible = $event"
      @save-task="saveTaskChanges"
      @delete-task="deleteTask"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
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
    const tasks = ref([]);
    const currentTask = ref({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium'
    });
    const isDialogVisible = ref(false);

    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/task/getAll', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        tasks.value = await response.json();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const addTaskToList = newTask => {
      tasks.value.push(newTask);
    };

    const openEditDialog = task => {
      currentTask.value = { ...task };
      isDialogVisible.value = true;
    };

    const closeEditDialog = () => {
      isDialogVisible.value = false;
    };

    const deleteTask = taskId => {
      tasks.value = tasks.value.filter(task => task._id !== taskId);
      closeEditDialog();
    };

    const saveTaskChanges = updatedTask => {
      const index = tasks.value.findIndex(task => task._id === updatedTask._id);
      if (index !== -1) tasks.value.splice(index, 1, updatedTask);
      closeEditDialog();
    };

    const toggleTaskCompletion = async taskId => {
      try {
        const response = await fetch(`/api/task/toggle/${taskId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to toggle task completion');
        const updatedTask = await response.json();
        saveTaskChanges(updatedTask);
      } catch (error) {
        console.error(error);
        alert('Error toggling task completion. Please try again.');
      }
    };

    onMounted(fetchTasks);

    return {
      tasks,
      isDialogVisible,
      currentTask,
      fetchTasks,
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
