import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TasksView from "@/views/TasksView.vue";
import NewTaskForm from "@/components/NewTaskForm.vue";
import TodoTable from "@/components/TodoTable.vue";
import EditTaskBox from "@/components/EditTaskBox.vue";

const mockTasks = [
  { _id: "1", title: "Task 1", completed: false, priority: "Medium" },
  { _id: "2", title: "Task 2", completed: true, priority: "High" },
];

global.fetch = vi.fn();

describe("TasksView.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTasks),
    });
  });

  it("renders all subcomponents correctly", () => {
    const wrapper = mount(TasksView);
    expect(wrapper.findComponent(NewTaskForm).exists()).toBe(true);
    expect(wrapper.findComponent(TodoTable).exists()).toBe(true);
    expect(wrapper.findComponent(EditTaskBox).exists()).toBe(false);
  });

  it("fetches tasks on mount", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      }),
    );

    const wrapper = mount(TasksView);

    // Wait for the fetch to resolve
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith("/api/task/getAll", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    expect(wrapper.vm.tasks).toEqual(mockTasks);
  });

  it("handles fetch error gracefully", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

    const wrapper = mount(TasksView);
    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalled();
    expect(wrapper.vm.tasks).toEqual([]);
  });

  it("adds a new task to the list", () => {
    const wrapper = mount(TasksView);
    const newTask = { _id: "3", title: "New Task", completed: false };

    wrapper.vm.addTaskToList(newTask);

    expect(wrapper.vm.tasks).toContainEqual(newTask);
  });

  it("opens and closes the edit task modal", () => {
    const wrapper = mount(TasksView);
    const taskToEdit = mockTasks[0];

    wrapper.vm.openEditModal(taskToEdit);
    expect(wrapper.vm.isEditModalVisible).toBe(true);
    expect(wrapper.vm.currentTask).toEqual(taskToEdit);

    wrapper.vm.closeEditModal();
    expect(wrapper.vm.isEditModalVisible).toBe(false);
    expect(wrapper.vm.currentTask).toBeNull();
  });

  it("deletes a task from the list", () => {
    const wrapper = mount(TasksView, {
      data: () => ({ tasks: [...mockTasks] }),
    });

    wrapper.vm.deleteTask(mockTasks[0]._id);

    expect(wrapper.vm.tasks).not.toContainEqual(mockTasks[0]);
  });

  it("saves task changes", () => {
    const wrapper = mount(TasksView, {
      data: () => ({ tasks: [...mockTasks] }),
    });
    const updatedTask = { ...mockTasks[0], title: "Updated Task" };

    wrapper.vm.saveTaskChanges(updatedTask);

    expect(wrapper.vm.tasks[0].title).toBe("Updated Task");
  });

  it("toggles task completion", async () => {
    const wrapper = mount(TasksView, {
      data: () => ({ tasks: [...mockTasks] }),
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ task: { ...mockTasks[0], completed: true } }),
    });

    await wrapper.vm.toggleTaskCompletion(mockTasks[0]._id);

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/task/toggle/${mockTasks[0]._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    expect(wrapper.vm.tasks[0].completed).toBe(true);
  });

  it("handles error when toggling task completion fails", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

    const wrapper = mount(TasksView);

    await wrapper.vm.toggleTaskCompletion("1");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/task/toggle/1",
      expect.anything(),
    );
    expect(alertSpy).toHaveBeenCalledWith(
      "Error toggling task completion. Please try again.",
    );

    alertSpy.mockRestore();
  });

  it("shows alert on toggle task error", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    const wrapper = mount(TasksView);
    await wrapper.vm.toggleTaskCompletion("1");

    expect(alertSpy).toHaveBeenCalledWith(
      "Error toggling task completion. Please try again.",
    );
  });
});
