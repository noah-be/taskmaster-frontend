<template>
  <v-container>
    <v-card>
      <v-data-table
        :items="taskStore.tasks"
        :headers="headers"
        class="elevation-1"
        dense
        outlined
        hide-default-footer
        @click:row="(event, item) => taskStore.openEditTaskBox(item.item._id)"
      >
        <template ref="taskTitle" #item.title="{ item }">
          {{ item.title }}
        </template>

        <template ref="taskDescription" #item.description="{ item }">
          {{ item.description }}
        </template>

        <template ref="taskDueDate" #item.dueDate="{ item }">
          {{ formatDateByLocale(item.dueDate, locale) }}
        </template>

        <template ref="taskPriority" #item.priority="{ item }">
          <v-chip dark small>
            {{ t(`components.todoTable.priorityOptions.${item.priority?.toLowerCase()}`) }}
          </v-chip>
        </template>

        <template #item.completed="{ item }">
          <v-checkbox
            ref="taskCompleted"
            v-model="item.completed"
            @click.stop="taskStore.toggleTaskCompletion(item._id, t)"
            class="d-flex align-center"
            dense
          ></v-checkbox>
          <span class="visually-hidden">{{ t('components.todoTable.completed') }}</span>
        </template>
      </v-data-table>
    </v-card>

    <v-container v-if="taskStore.currentTaskId">
      <EditTaskBox />
    </v-container>
  </v-container>
</template>

<script>
import EditTaskBox from '@/components/EditTaskBox.vue';
import { useI18n } from 'vue-i18n';
import { useTaskStore } from '@/stores/taskStore';
import { formatDateByLocale } from '@/utils/dateUtils';

// TODO: Add v-chip with color based on priority

export default {
  components: {
    EditTaskBox
  },
  setup() {
    const { t, locale } = useI18n();
    const taskStore = useTaskStore();

    const headers = ['title', 'description', 'dueDate', 'priority', 'completed'].map(key => ({
      title: t(`components.todoTable.${key}`),
      key
    }));

    return {
      t,
      locale,
      headers,
      taskStore,
      formatDateByLocale
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
