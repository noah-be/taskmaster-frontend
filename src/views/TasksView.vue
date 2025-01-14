<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>
            <h2 class="text-center w-100">{{ $t('views.tasks.title') }}</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <NewTaskForm />
            <TodoTable :tasks="tasks" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewTaskForm from '@/components/NewTaskForm.vue';
import TodoTable from '@/components/TodoTable.vue';
import { onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

export default {
  components: {
    NewTaskForm,
    TodoTable
  },
  setup() {
    const taskStore = useTaskStore();

    onMounted(() => {
      taskStore.fetchTasks();
    });

    const tasks = computed(() => taskStore.tasks);

    return {
      tasks
    };
  }
};
</script>
