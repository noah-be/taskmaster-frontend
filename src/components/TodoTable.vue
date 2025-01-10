<template>
  <v-container data-testid="v-container">
    <v-card>
      <v-data-table :items="tasks" :headers="headers" item-value="_id" class="elevation-1" dense outlined hide-default-footer @click:row="onRowClick">
        <template #item.dueDate="{ item }">
          {{ formatdDueDate(item.dueDate) }}
        </template>

        <template #item.priority="{ item }">
          <v-chip :data-testid="getChipId(item)" :color="getPriorityColor(item.priority)" dark small>
            {{ priorityText(item.priority) }}
          </v-chip>
        </template>

        <template #item.completed="{ item }">
          <div class="d-flex align-center">
            <label :for="getCheckboxId(item)" class="d-flex align-center">
              <v-checkbox
                :id="getCheckboxId(item)"
                v-model="item.completed"
                :data-testid="getCheckboxId(item)"
                @click.stop="toggleTask(item)"
                class="d-flex align-center"
                dense
              ></v-checkbox>
              <span class="visually-hidden">{{ getCompletedLabel() }}</span>
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
    const { t, locale } = useI18n();

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

    const onRowClick = row => {
      emit('edit-task', row.item);
    };

    const priorityText = priority => {
      priority = (priority || 'medium').toLowerCase();
      return t(`components.todoTable.priorityColors.${priority}`);
    };

    const formatdDueDate = dueDate => {
      if (!dueDate) return t('components.todoTable.invalidDate');
      return new Date(dueDate).toLocaleDateString(locale.value);
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

    const getCompletedLabel = () => t('components.todoTable.completed');
    const getCheckboxId = item => `checkbox-${item._id}`;
    const getChipId = item => `chip-${item._id}`;

    return {
      t,
      headers,
      toggleTask,
      onRowClick,
      priorityText,
      formatdDueDate,
      getPriorityColor,
      getCompletedLabel,
      getCheckboxId,
      getChipId
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
