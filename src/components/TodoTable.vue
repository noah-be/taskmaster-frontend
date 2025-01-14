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
          <v-chip :color="getPriorityColor(item.priority)" dark small>
            {{ priorityText(item.priority) }}
          </v-chip>
        </template>

        <template #item.completed="{ item }">
          <v-checkbox v-model="item.completed" @click.stop="toggleTask(item._id)" class="d-flex align-center" dense></v-checkbox>
          <span class="visually-hidden">{{ t('components.todoTable.completed') }}</span>
        </template>
      </v-data-table>
    </v-card>

    <EditTaskBox
      v-if="currentTaskId"
      :task-id="currentTaskId"
      :is-dialog-visible="isDialogVisible"
      @update:is-dialog-visible="isDialogVisible = $event"
      @save-task="saveTaskChanges"
      @delete-task="deleteTask"
    />
  </v-container>
</template>

<script>
import EditTaskBox from '@/components/EditTaskBox.vue';
import { useI18n } from 'vue-i18n';
import { useTaskStore } from '@/stores/taskStore';
import { computed } from 'vue';

export default {
  components: {
    EditTaskBox
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  emits: ['edit-task', 'toggle-task'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();

    const taskStore = useTaskStore();

    const currentTaskId = computed(() => taskStore.currentTaskId);

    const headers = [
      { title: t('components.todoTable.title'), key: 'title' },
      { title: t('components.todoTable.description'), key: 'description' },
      { title: t('components.todoTable.dueDate'), key: 'dueDate' },
      { title: t('components.todoTable.priority'), key: 'priority' },
      { title: t('components.todoTable.done'), key: 'completed' }
    ];

    const toggleTask = taskId => {
      taskStore.toggleTaskCompletion(taskId);
    };

    const onRowClick = (event, item) => {
      taskStore.currentTaskId = item._id;
      taskStore.isEditDialogOpen = true;
    };

    const priorityText = priority => t(`components.todoTable.priorityColors.${priority?.toLowerCase() || 'unknown'}`);

    const formatedDueDate = dueDate => {
      if (dueDate) {
        return new Date(dueDate).toLocaleDateString(locale.value);
      } else {
        return t('components.todoTable.invalidDate');
      }
    };

    const getPriorityColor = priority => {
      const colors = {
        High: 'red',
        Medium: 'orange',
        Low: 'blue'
      };
      return colors[priority] || 'grey';
    };

    return {
      t,
      headers,
      currentTaskId,
      toggleTask,
      onRowClick,
      priorityText,
      formatedDueDate,
      getPriorityColor
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
