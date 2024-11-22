<template>
  <main>
    <h2>To-Do List</h2>

    <NewTaskForm @task-added="addTaskToList" />

    <TodoTable
      :tasks="tasks"
      @edit-task="openEditModal"
      @toggle-task="toggleTaskCompletion"
    />

    <EditTaskBox
      v-if="isEditModalVisible"
      :task="currentTask"
      @close="closeEditModal"
      @delete-task="deleteTask"
      @save-task="saveTaskChanges"
    />
  </main>
</template>

<script>
import NewTaskForm from "@/components/NewTaskForm.vue";
import TodoTable from "@/components/TodoTable.vue";
import EditTaskBox from "@/components/EditTaskBox.vue";

export default {
  components: {
    NewTaskForm,
    TodoTable,
    EditTaskBox,
  },
  data() {
    return {
      tasks: [],
      isEditModalVisible: false,
      currentTask: null,
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch("/api/task/getAll", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        this.tasks = await response.json();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    addTaskToList(newTask) {
      this.tasks.push(newTask);
    },
    openEditModal(task) {
      this.currentTask = { ...task };
      this.isEditModalVisible = true;
    },
    closeEditModal() {
      this.isEditModalVisible = false;
      this.currentTask = null;
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task._id !== taskId);
      this.closeEditModal();
    },
    saveTaskChanges(updatedTask) {
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === updatedTask.id,
      );
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1, updatedTask);
      }
      this.closeEditModal();
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
