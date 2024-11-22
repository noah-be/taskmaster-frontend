<template>
  <div id="todo-table-container">
    <table id="todo-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in tasks"
          :key="task.id"
          :class="task.completed ? 'done' : 'not-done-' + task.priority"
          @click="$emit('edit-task', task)"
        >
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.priority }}</td>
          <td>
            <input
              type="checkbox"
              :checked="task.completed"
              @change.stop="$emit('toggle-task', task.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>
