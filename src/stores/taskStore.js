import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    currentTaskId: null,
    error: null
  }),
  getters: {
    allTasks: state => state.tasks
  },
  actions: {
    async fetchTasks(t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/task/getAll`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks.');
        }
        this.tasks = await response.json();
      } catch (error) {
        console.error('Fetch tasks error:', error.message);
        this.error = t('stores.taskStore.fetchError');
      }
    },
    async toggleTaskCompletion(taskId, t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/task/toggle/${taskId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to toggle task completion.');
        }
        const updatedTask = await response.json();
        const taskIndex = this.tasks.findIndex(task => task._id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        }
      } catch (error) {
        console.error('Toggle task error:', error.message);
        this.error = t('stores.taskStore.toggleTaskError');
      }
    },
    async addTask(task, t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/task`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(task)
        });
        if (!response.ok) {
          throw new Error('Failed to add task.');
        }
        const newTask = await response.json();
        this.tasks.push(newTask);
      } catch (error) {
        console.error('Add task error:', error.message);
        this.error = t('stores.taskStore.addTaskError');
      }
    },
    async deleteTask(taskId, t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/task/${taskId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete task.');
        }
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      } catch (error) {
        console.error('Delete task error:', error.message);
        this.error = t('stores.taskStore.deleteTaskError');
      }
    },
    async updateTask(taskId, updatedData, t) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/task/${taskId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
          throw new Error('Failed to update task.');
        }
        const updatedTask = await response.json();
        const taskIndex = this.tasks.findIndex(task => task._id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        }
      } catch (error) {
        console.error('Update task error:', error.message);
        this.error = t('stores.taskStore.editTaskError');
      }
    },
    openEditTaskBox(taskId) {
      this.currentTaskId = taskId;
    },
    closeEditDialog() {
      this.currentTaskId = null;
    },
    clearError() {
      this.error = null;
    }
  }
});
