import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    currentTaskId: null
  }),
  getters: {
    allTasks: state => state.tasks
  },
  actions: {
    async fetchTasks() {
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

    async addTask(task) {
      const response = await fetch(`${API_BASE_URL}/api/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(task)
      });

      const newTask = await response.json();
      this.tasks.push(newTask);
    },
    async deleteTask(taskId) {
      const response = await fetch(`${API_BASE_URL}/api/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      this.tasks = this.tasks.filter(task => task._id !== taskId);
    },
    updateTask(taskId, updatedData) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedData };
      }
    },
    openEditTaskBox(taskId) {
      this.currentTaskId = taskId;
    },
    closeEditDialog() {
      this.currentTaskId = null;
    }
  }
});
