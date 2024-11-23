import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import EditTaskBox from "@/components/EditTaskBox.vue";

describe("EditTaskBox.vue", () => {
  const mockTask = {
    _id: "1",
    title: "Test Task",
    description: "Test Description",
    dueDate: "2023-12-31",
    priority: "High",
  };

  it("matches the snapshot", () => {
    const wrapper = mount(EditTaskBox, {
      props: {
        task: mockTask,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("emits save-task with updated task on saveChanges", async () => {
    const updatedTask = { ...mockTask, title: "Updated Task" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedTask),
      }),
    );

    const wrapper = mount(EditTaskBox, {
      props: { task: mockTask },
    });

    await wrapper.find("#edit-task-title").setValue("Updated Task");
    await wrapper.find("#save-edit-task-btn").trigger("click");

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/task/${mockTask._id}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedTask),
      }),
    );

    expect(wrapper.emitted("save-task")).toBeTruthy();
    expect(wrapper.emitted("save-task")[0][0].title).toBe("Updated Task");

    global.fetch.mockRestore();
  });

  it("emits delete-task with task ID on deleteTask", async () => {
    const wrapper = mount(EditTaskBox, {
      props: { task: mockTask },
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      }),
    );

    await wrapper.find("#delete-task-btn").trigger("click");

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/task/${mockTask._id}`,
      expect.anything(),
    );
    expect(wrapper.emitted("delete-task")).toBeTruthy();
    expect(wrapper.emitted("delete-task")[0][0]).toBe(mockTask._id);
  });

  it("emits close on clicking close button", async () => {
    const wrapper = mount(EditTaskBox, {
      props: { task: mockTask },
    });

    await wrapper.find(".close").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("updates taskCopy when form fields are changed", async () => {
    const wrapper = mount(EditTaskBox, {
      props: { task: mockTask },
    });

    await wrapper.find("#edit-task-title").setValue("New Title");
    await wrapper.find("#edit-task-description").setValue("New Description");
    await wrapper.find("#edit-task-due-date").setValue("2024-01-01");
    await wrapper.find("#edit-task-priority").setValue("Medium");

    expect(wrapper.vm.taskCopy.title).toBe("New Title");
    expect(wrapper.vm.taskCopy.description).toBe("New Description");
    expect(wrapper.vm.taskCopy.dueDate).toBe("2024-01-01");
    expect(wrapper.vm.taskCopy.priority).toBe("Medium");
  });
});
