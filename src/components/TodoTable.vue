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
            {{ $t('components.todoTable.priorityColors.' + (item.priority || 'default').toLowerCase()) }}
          </v-chip>
        </template>

        <template #item.completed="{ item }">
          <div class="d-flex align-center">
            <label :for="'checkbox-' + item._id" class="d-flex align-center">
              <v-checkbox
                :id="'checkbox-' + item._id"
                :value="item.completed"
                :data-testid="'checkbox-' + item._id"
                @click.stop="toggleTask(item)"
                class="d-flex align-center"
                dense
              ></v-checkbox>
              <span class="visually-hidden">{{ $t('components.todoTable.completed') }}</span>
            </label>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const headers = [
      { title: t('components.todoTable.title'), key: 'title' },
      { title: t('components.todoTable.description'), key: 'description' },
      { title: t('components.todoTable.dueDate'), key: 'dueDate' },
      { title: t('components.todoTable.priority'), key: 'priority' },
      { title: t('components.todoTable.done'), key: 'completed' }
    ];

    const toggleTask = task => {
      emit('toggle-task', task._id);
    };

    const onRowClick = (event, row) => {
      emit('edit-task', row.item);
    };

    const getPriorityColor = priority => {
      switch ((priority || '').toLowerCase()) {
        case 'high':
          return 'red';
        case 'medium':
          return 'orange';
        case 'low':
          return 'blue';
        default:
          return 'grey';
      }
    };

    const formatDueDate = date => {
      if (!date) return t('components.todoTable.invalidDate');
      const parsedDate = new Date(date);
      return isNaN(parsedDate) ? t('components.todoTable.invalidDate') : parsedDate.toLocaleDateString();
    };

    return {
      t,
      headers,
      toggleTask,
      onRowClick,
      getPriorityColor,
      formatDueDate
    };
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
