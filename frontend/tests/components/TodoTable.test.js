import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TodoTable from "@/components/TodoTable.vue";

const mockTasks = [
  {
    id: "1",
    title: "Test Task 1",
    description: "Description for task 1",
    dueDate: "2023-12-01",
    priority: "High",
    completed: false,
  },
  {
    id: "2",
    title: "Test Task 2",
    description: "Description for task 2",
    dueDate: "2023-12-05",
    priority: "Low",
    completed: true,
  },
];

describe("TodoTable.vue", () => {
  it("renders the table correctly", () => {
    const wrapper = mount(TodoTable, {
      props: { tasks: mockTasks },
    });

    expect(wrapper.find("#todo-table").exists()).toBe(true);
    expect(wrapper.findAll("thead th").length).toBe(5);
    expect(wrapper.findAll("tbody tr").length).toBe(mockTasks.length);
  });

  it("emits 'edit-task' when a row is clicked", async () => {
    const wrapper = mount(TodoTable, {
      props: { tasks: mockTasks },
    });

    const rows = wrapper.findAll("tbody tr");

    await rows[0].trigger("click");
    expect(wrapper.emitted("edit-task")).toBeTruthy();
    expect(wrapper.emitted("edit-task")[0][0]).toEqual(mockTasks[0]);

    await rows[1].trigger("click");
    expect(wrapper.emitted("edit-task")[1][0]).toEqual(mockTasks[1]);
  });

  //   it("emits 'toggle-task' when the checkbox is clicked", async () => {
  //     const wrapper = mount(TodoTable, {
  //       props: { tasks: mockTasks },
  //     });

  //     const checkboxes = wrapper.findAll("tbody input[type='checkbox']");

  //     await checkboxes[0].trigger("change");
  //     expect(wrapper.emitted("toggle-task")).toBeTruthy();
  //     expect(wrapper.emitted("toggle-task")[0][0]).toBe(mockTasks[0].id);

  //     await checkboxes[1].trigger("change");
  //     expect(wrapper.emitted("toggle-task")[1][0]).toBe(mockTasks[1].id);
  //   });

  it("applies the correct row class based on task completion", () => {
    const wrapper = mount(TodoTable, {
      props: { tasks: mockTasks },
    });

    const rows = wrapper.findAll("tbody tr");

    expect(rows[0].classes()).toContain("not-done-High");
    expect(rows[1].classes()).toContain("done");
  });
});
