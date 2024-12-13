<template>
  <v-container data-testid="v-container">
    <v-card data-testid="v-card">
      <v-data-table
        data-testid="data-table"
        :items="tasks"
        :headers="headers"
        item-value="_id"
        class="elevation-1"
        dense
        outlined
        hide-default-footer
        @click:row="onRowClick"
      >
        <template #item.dueDate="{ item }">
          {{ formatDueDate(item.dueDate) }}
        </template>

        <template #item.priority="{ item }">
          <v-chip :data-testid="'chip-' + item._id" :color="getPriorityColor(item.priority)" dark small>
            {{ item.priority }}
          </v-chip>
        </template>

        <template #item.completed="{ item }">
          <div class="d-flex align-center">
            <label :for="'checkbox-' + item._id" class="d-flex align-center">
              <v-checkbox
                :id="'checkbox-' + item._id"
                v-model="item.completed"
                :data-testid="'checkbox-' + item._id"
                @click.stop="toggleTask(item)"
                class="d-flex align-center"
                dense
              ></v-checkbox>
              <span class="visually-hidden">Completed</span>
            </label>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { title: 'Title', key: 'title' },
        { title: 'Description', key: 'description' },
        { title: 'Due Date', key: 'dueDate' },
        { title: 'Priority', key: 'priority' },
        { title: 'Done', key: 'completed' }
      ]
    };
  },
  methods: {
    toggleTask(task) {
      this.$emit('toggle-task', task._id);
    },
    onRowClick(event, row) {
      this.$emit('edit-task', row.item);
    },
    getPriorityColor(priority) {
      switch (priority) {
        case 'High':
          return 'red';
        case 'Medium':
          return 'orange';
        case 'Low':
          return 'blue';
        default:
          return 'grey';
      }
    },
    formatDueDate(date) {
      if (!date) return 'Invalid Date';
      const parsedDate = new Date(date);
      return isNaN(parsedDate) ? 'Invalid Date' : parsedDate.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
