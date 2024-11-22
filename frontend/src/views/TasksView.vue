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

<style lang="scss">
main {
  padding: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.edit-task-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  overflow: auto;

  &-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 30px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    h2 {
      margin-bottom: 20px;
      color: #333;
      font-size: 28px;
      font-weight: bold;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-size: 18px;
    }

    input[type="text"],
    input[type="date"],
    textarea,
    select {
      width: 100%;
      padding: 8px 12px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
    }

    textarea {
      height: 100px;
      resize: vertical;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition:
        background-color 0.3s,
        color 0.3s;

      &:hover {
        opacity: 0.9;
      }
    }

    #save-edit-task-btn {
      background-color: #4caf50;
      color: white;

      &:hover {
        background-color: #45a049;
      }
    }

    #delete-task-btn {
      background-color: #f44336;
      color: white;
      margin-right: 10px;

      &:hover {
        background-color: #da190b;
      }
    }
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
}

#new-task-form {
  display: flex;
  align-items: center;
  gap: 10px;

  #task-input,
  #priority-input,
  #add-task-btn {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 1;
    box-sizing: border-box;
    flex-grow: 1;
  }

  #task-input {
    flex-basis: 70%;
  }

  #priority-input {
    flex-basis: 15%;
  }

  #add-task-btn {
    flex-basis: 15%;
    background-color: #4caf50;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
}

#todo-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;

  th,
  td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    // Title column
    &:nth-child(1) {
      width: 20%;
    }

    // Description column
    &:nth-child(2) {
      width: 58%;
    }

    // Due Date column
    &:nth-child(3) {
      width: 10%;
    }

    // Priority column
    &:nth-child(4) {
      width: 7%;
    }

    // Done column
    &:nth-child(5) {
      width: 5%;
    }
  }

  th {
    background-color: #f2f2f2;
  }

  @each $priority, $color in $priority-colors {
    .not-done-#{$priority} {
      background-color: $color;
    }
  }

  .done {
    background-color: lightgreen;
  }
}
</style>
