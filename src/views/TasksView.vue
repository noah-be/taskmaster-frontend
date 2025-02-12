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

    <v-snackbar v-model="showSnackbar" :timeout="5000" color="error" top>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import NewTaskForm from '@/components/NewTaskForm.vue';
import TodoTable from '@/components/TodoTable.vue';
import { onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { watch, ref } from 'vue';

export default {
  components: {
    NewTaskForm,
    TodoTable
  },
  setup() {
    const taskStore = useTaskStore();

    const showSnackbar = ref(false);
    const errorMessage = ref('');

    onMounted(() => {
      taskStore.fetchTasks();
    });

    const tasks = computed(() => taskStore.tasks);

    watch(
      () => taskStore.error,
      newError => {
        if (newError) {
          errorMessage.value = newError;
          showSnackbar.value = true;
          taskStore.clearError();
        }
      },
      { immediate: true }
    );

    return {
      tasks,
      showSnackbar,
      errorMessage
    };
  }
};
</script>
