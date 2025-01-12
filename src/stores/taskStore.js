import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  getters: {
    allTasks: state => state.tasks
  },
  actions: {
    fetchTasks: async function () {
      const response = await fetch(`${API_BASE_URL}/api/task/getAll`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.tasks = await response.json();
    },

    toggleTaskCompletion: async function (taskId) {
      await fetch(`${API_BASE_URL}/api/task/toggle/${taskId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },

    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    updateTask(taskId, updatedData) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedData };
      }
    }
  }
});
