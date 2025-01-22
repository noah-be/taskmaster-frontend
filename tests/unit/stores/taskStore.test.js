import { setActivePinia, createPinia } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

describe('taskStore', () => {
  let taskStore;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    taskStore = useTaskStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('State', () => {
    it('should have an initial state', () => {
      expect(taskStore.tasks).toEqual([]);
      expect(taskStore.currentTaskId).toBeNull();
    });
  });

  describe('Getters', () => {
    it('should return all tasks using the allTasks getter', () => {
      taskStore.tasks = [{ _id: '1', title: 'Task 1' }];
      expect(taskStore.allTasks).toEqual([{ _id: '1', title: 'Task 1' }]);
    });
  });

  describe('Actions', () => {
    describe('fetchTasks', () => {
      it('should fetch tasks and update the state', async () => {
        global.fetch = vi.fn().mockResolvedValue({
          json: () => Promise.resolve([{ _id: '1', title: 'Task 1' }])
        });

        await taskStore.fetchTasks();
        expect(taskStore.tasks).toEqual([{ _id: '1', title: 'Task 1' }]);
        expect(global.fetch).toHaveBeenCalledWith(
          `${API_BASE_URL}/api/task/getAll`,
          expect.objectContaining({
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        );
      });
    });

    describe('toggleTaskCompletion', () => {
      it('should toggle task completion and update the task', async () => {
        taskStore.tasks = [{ _id: '1', title: 'Task 1', completed: false }];
        global.fetch = vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ _id: '1', completed: true })
        });

        await taskStore.toggleTaskCompletion('1');
        expect(taskStore.tasks[0].completed).toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/task/toggle/1`, expect.objectContaining({ method: 'PATCH' }));
      });
    });

    describe('addTask', () => {
      it('should add a new task to the state', async () => {
        global.fetch = vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ _id: '2', title: 'New Task' })
        });

        await taskStore.addTask({ title: 'New Task' });
        expect(taskStore.tasks).toContainEqual({ _id: '2', title: 'New Task' });
      });
    });

    describe('deleteTask', () => {
      it('should remove a task by ID', async () => {
        taskStore.tasks = [{ _id: '1', title: 'Task 1' }];
        global.fetch = vi.fn().mockResolvedValue({});

        await taskStore.deleteTask('1');
        expect(taskStore.tasks).toEqual([]);
      });
    });

    describe('updateTask', () => {
      it('should update a task in the state', async () => {
        taskStore.tasks = [{ _id: '1', title: 'Task 1' }];
        global.fetch = vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ _id: '1', title: 'Updated Task' })
        });

        await taskStore.updateTask('1', { title: 'Updated Task' });
        expect(taskStore.tasks[0].title).toBe('Updated Task');
      });
    });

    describe('openEditTaskBox', () => {
      it('should set currentTaskId to the provided ID', () => {
        taskStore.openEditTaskBox('1');
        expect(taskStore.currentTaskId).toBe('1');
      });
    });

    describe('closeEditDialog', () => {
      it('should reset currentTaskId to null', () => {
        taskStore.currentTaskId = '1';
        taskStore.closeEditDialog();
        expect(taskStore.currentTaskId).toBeNull();
      });
    });
  });
});
