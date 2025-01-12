import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  getters: {
    allTasks: state => state.tasks
  },
  actions: {
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
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }
});
