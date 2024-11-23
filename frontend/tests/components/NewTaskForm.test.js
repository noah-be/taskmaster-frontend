import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import NewTaskForm from "@/components/NewTaskForm.vue";

describe("NewTaskForm.vue", () => {
  it("matches the snapshot", () => {
    const wrapper = mount(NewTaskForm);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("binds input fields correctly", async () => {
    const wrapper = mount(NewTaskForm);
    const titleInput = wrapper.find("#task-input");
    const dueDateInput = wrapper.find("#due-date-input");
    const prioritySelect = wrapper.find("#priority-input");

    await titleInput.setValue("Test Task");
    await dueDateInput.setValue("2024-12-01");
    await prioritySelect.setValue("High");

    expect(wrapper.vm.title).toBe("Test Task");
    expect(wrapper.vm.dueDate).toBe("2024-12-01");
    expect(wrapper.vm.priority).toBe("High");
  });

  it("calls fetch with correct data", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            title: "Test Task",
            priority: "High",
            dueDate: "2024-12-01",
          }),
      }),
    );

    const wrapper = mount(NewTaskForm);

    await wrapper.find("#task-input").setValue("Test Task");
    await wrapper.find("#priority-input").setValue("High");
    await wrapper.find("#due-date-input").setValue("2024-12-01");
    await wrapper.find("#add-task-btn").trigger("click");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/task",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: "Test Task",
          priority: "High",
          dueDate: "2024-12-01",
        }),
      }),
    );
  });

  it("emits task-added with the new task", async () => {
    const mockTask = {
      title: "Test Task",
      priority: "High",
      dueDate: "2024-12-01",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTask),
      }),
    );

    const wrapper = mount(NewTaskForm);

    await wrapper.find("#task-input").setValue("Test Task");
    await wrapper.find("#priority-input").setValue("High");
    await wrapper.find("#due-date-input").setValue("2024-12-01");
    await wrapper.find("#add-task-btn").trigger("click");

    expect(wrapper.emitted("task-added")).toBeTruthy();
    expect(wrapper.emitted("task-added")[0][0]).toEqual(mockTask);
  });

  it("shows an alert if task title or due date is missing", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(NewTaskForm);

    await wrapper.find("#add-task-btn").trigger("click");

    expect(alertMock).toHaveBeenCalledWith(
      "Task title and due date are required.",
    );
    alertMock.mockRestore();
  });

  it("resets the form after adding a task", async () => {
    const wrapper = mount(NewTaskForm);

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    );

    await wrapper.find("#task-input").setValue("Test Task");
    await wrapper.find("#due-date-input").setValue("2024-12-01");
    await wrapper.find("#add-task-btn").trigger("click");

    expect(wrapper.vm.title).toBe("");
    expect(wrapper.vm.priority).toBe("Medium");
    expect(wrapper.vm.dueDate).toBe("");
  });
});
