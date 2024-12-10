import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import LoginForm from "@/components/LoginForm.vue";
import { useRouter } from "vue-router";

vi.mock("vue-router", () => ({
  useRouter: vi.fn(),
}));

describe("LoginForm.vue", () => {
  const vuetify = createVuetify();
  let mockRouter;

  beforeEach(() => {
    mockRouter = { push: vi.fn() };
    useRouter.mockReturnValue(mockRouter);
    global.alert = vi.fn();
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("renders correctly", () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("updates username and password when input is provided", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const usernameInput = wrapper.find('input[autocomplete="username"]');
    const passwordInput = wrapper.find('input[autocomplete="current-password"]');

    await usernameInput.setValue("testuser");
    await passwordInput.setValue("testpassword");

    expect(wrapper.vm.username).toBe("testuser");
    expect(wrapper.vm.password).toBe("testpassword");
  });

  it("calls submitLogin on form submission", async () => {
    const mockRedirectUrl = "/some-redirect-url";
    const mockRouter = { push: vi.fn() };
  
    useRouter.mockReturnValue(mockRouter);
  
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [vuetify],
      },
    });
  
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "12345", redirectUrl: mockRedirectUrl }),
      })
    );
  
    global.fetch = mockFetch;
  
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");
  
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "",
          password: "",
        }),
      })
    );
    expect(localStorage.getItem("token")).toBe("12345");
    expect(mockRouter.push).toHaveBeenCalledWith(mockRedirectUrl);
  });
  
  

  it("displays an alert on login failure", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    global.fetch = mockFetch;

    const form = wrapper.find("form");
    await form.trigger("submit.prevent");

    expect(mockFetch).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith("Login failed. Please try again.");
  });

it('opens the RegisterBox when "Create New Account" button is clicked', async () => {
  const wrapper = mount(LoginForm, {
    global: {
      plugins: [vuetify],
    },
  });

  const button = wrapper.find('.v-btn.mt-2');
  await button.trigger('click');
  expect(wrapper.vm.showregisterBox).toBe(true);
});

  
});
