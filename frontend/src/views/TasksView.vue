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
            <TodoTable :tasks="tasks" @edit-task="openEditModal" @toggle-task="toggleTaskCompletion" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <EditTaskBox v-if="isEditModalVisible" :task="currentTask" @close="closeEditModal" @delete-task="deleteTask" @save-task="saveTaskChanges" />
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
    const isEditModalVisible = ref(false);
    const currentTask = ref(null);

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

    const openEditModal = task => {
      currentTask.value = { ...task };
      isEditModalVisible.value = true;
    };

    const closeEditModal = () => {
      isEditModalVisible.value = false;
      currentTask.value = null;
    };

    const deleteTask = taskId => {
      tasks.value = tasks.value.filter(task => task._id !== taskId);
      closeEditModal();
    };

    const saveTaskChanges = updatedTask => {
      const index = tasks.value.findIndex(task => task._id === updatedTask._id);
      if (index !== -1) tasks.value.splice(index, 1, updatedTask);
      closeEditModal();
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
        const index = tasks.value.findIndex(task => task._id === taskId);
        if (index !== -1) tasks.value.splice(index, 1, updatedTask);
      } catch (error) {
        console.error(error);
        alert('Error toggling task completion. Please try again.');
      }
    };

    onMounted(fetchTasks);

    return {
      tasks,
      isEditModalVisible,
      currentTask,
      fetchTasks,
      addTaskToList,
      openEditModal,
      closeEditModal,
      deleteTask,
      saveTaskChanges,
      toggleTaskCompletion
    };
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.w-100 {
  width: 100%;
}
</style>
