import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm.vue";
import { createRouter, createWebHistory } from "vue-router";

const DummyComponent = { template: "<div>Dummy</div>" }; // Dummy Component for router setup

// Mock router setup
const mockRoutes = [
  { path: "/", name: "home", component: DummyComponent },
  { path: "/tasks", name: "tasks", component: DummyComponent },
];
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: mockRoutes,
});

beforeAll(() => {
  global.alert = vi.fn(); // Mock window.alert
  global.fetch = vi.fn(); // Mock fetch API
});

describe("LoginForm.vue", () => {
  it("matches the snapshot", () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [mockRouter],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("shows the RegisterBox when the create new account button is clicked", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [mockRouter],
      },
    });

    await wrapper.find("#create-new-account-btn").trigger("click");
    expect(wrapper.findComponent({ name: "RegisterBox" }).exists()).toBe(true);
  });

  it("sends login request with correct data", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: "123", redirectUrl: "/tasks" }),
    });

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [mockRouter],
      },
    });

    await wrapper.find("#login-username").setValue("testuser");
    await wrapper.find("#login-password").setValue("testpass");
    await wrapper.find("#login-form").trigger("submit.prevent");

    expect(global.fetch).toHaveBeenCalledWith("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "testpass" }),
    });
  });

  it("handles login errors correctly", async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [mockRouter],
      },
    });

    await wrapper.find("#login-username").setValue("testuser");
    await wrapper.find("#login-password").setValue("wrongpass");
    await wrapper.find("#login-form").trigger("submit.prevent");

    expect(global.fetch).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith(
      "Login failed. Please try again.",
    );
  });
});
