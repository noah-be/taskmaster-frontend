<template>
  <v-container>
    <v-card>
      <v-data-table :items="tasks" :headers="headers" class="elevation-1" dense outlined hide-default-footer @click:row="onRowClick">
        <template #item.title="{ item }">
          {{ item.title }}
        </template>

        <template #item.description="{ item }">
          {{ item.description }}
        </template>

        <template #item.dueDate="{ item }">
          {{ formatedDueDate(item.dueDate) }}
        </template>

        <template #item.priority="{ item }">
          <v-chip :data-testid="getChipId(item)" :color="getPriorityColor(item.priority)" dark small>
            {{ priorityText(item.priority) }}
          </v-chip>
        </template>

        <template #item.completed="{ item }">
          <v-checkbox v-model="item.completed" @click.stop="toggleTask(item)" class="d-flex align-center" dense></v-checkbox>
          <span class="visually-hidden">{{ getCompletedLabel() }}</span>
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

    const onRowClick = (item, event) => {
      emit('edit-task', event.item);
    };

    const priorityText = priority => {
      if (priority) {
        priority = priority.toLowerCase();
        return t(`components.todoTable.priorityColors.${priority}`);
      } else {
        return t(`components.todoTable.priorityColors.unknown`);
      }
    };

    const formatedDueDate = dueDate => {
      if (dueDate) {
        return new Date(dueDate).toLocaleDateString(locale.value);
      } else {
        return t('components.todoTable.invalidDate');
      }
    };

    const getPriorityColor = priority => {
      if (priority) {
        switch (priority) {
          case t(`components.todoTable.priorityColors.high`):
            return 'red';
          case t(`components.todoTable.priorityColors.medium`):
            return 'orange';
          case t(`components.todoTable.priorityColors.low`):
            return 'blue';
        }
      } else {
        return 'grey';
      }
    };

    /* istanbul ignore next */
    const getCompletedLabel = () => t('components.todoTable.completed');
    /* istanbul ignore next */
    const getChipId = item => `chip-${item._id}`;

    return {
      t,
      headers,
      toggleTask,
      onRowClick,
      priorityText,
      formatedDueDate,
      getPriorityColor,
      getCompletedLabel,
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
