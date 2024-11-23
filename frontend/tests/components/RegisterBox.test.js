import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import RegisterBox from "@/components/RegisterBox.vue";
import RegistrationGuidelines from "@/components/RegistrationGuidelines.vue";

describe("RegisterBox.vue", () => {
  it("toggles guidelines visibility", async () => {
    const wrapper = mount(RegisterBox);
    const toggleButton = wrapper.find("#toggle-guidelines-btn");

    expect(wrapper.findComponent(RegistrationGuidelines).props("visible")).toBe(
      false,
    );
    await toggleButton.trigger("click");
    expect(wrapper.findComponent(RegistrationGuidelines).props("visible")).toBe(
      true,
    );
  });

  it("closes modal when close button is clicked", async () => {
    const wrapper = mount(RegisterBox);
    await wrapper.find(".close").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("validates username input", async () => {
    const wrapper = mount(RegisterBox);

    const usernameInput = wrapper.find("#register-username");
    await usernameInput.setValue("te");

    expect(wrapper.vm.usernameFeedback).toBe(
      "Username must be at least 3 characters",
    );
    expect(wrapper.vm.feedbackColor).toBe("red");

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ isAvailable: false }),
      }),
    );

    await usernameInput.setValue("takenuser");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/check-username?username=takenuser",
    );
    expect(wrapper.vm.usernameFeedback).toBe("Username is already taken");
    expect(wrapper.vm.feedbackColor).toBe("red");

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ isAvailable: true }),
      }),
    );

    await usernameInput.setValue("newuser");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/check-username?username=newuser",
    );
    expect(wrapper.vm.usernameFeedback).toBe("Username is available");
    expect(wrapper.vm.feedbackColor).toBe("green");

    global.fetch = vi.fn(() => Promise.reject(new Error("Server error")));

    await usernameInput.setValue("erroruser");

    expect(wrapper.vm.usernameFeedback).toBe("Error checking username");
    expect(wrapper.vm.feedbackColor).toBe("red");
  });

  it("validates password input", async () => {
    const wrapper = mount(RegisterBox);
    const passwordInput = wrapper.find("#register-password");

    await passwordInput.setValue("short");
    expect(wrapper.vm.passwordFeedback).toBe(
      "Password must be at least 8 characters long",
    );

    await passwordInput.setValue("NoNumbers");
    expect(wrapper.vm.passwordFeedback).toBe(
      "Password must include at least one number",
    );

    await passwordInput.setValue("ALLUPPERCASE123!");
    expect(wrapper.vm.passwordFeedback).toBe(
      "Password must include both upper and lower case letters",
    );

    await passwordInput.setValue("alllowercase123!");
    expect(wrapper.vm.passwordFeedback).toBe(
      "Password must include both upper and lower case letters",
    );

    await passwordInput.setValue("Valid123");
    expect(wrapper.vm.passwordFeedback).toBe(
      "Password must include at least one special symbol like !, @, #, etc.",
    );
    expect(wrapper.vm.passwordFeedbackColor).toBe("red");

    await passwordInput.setValue("Valid123!");
    expect(wrapper.vm.passwordFeedback).toBe("");
    expect(wrapper.vm.passwordFeedbackColor).toBe("green");
  });

  it("submits registration data and navigates to tasks upon success", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      }),
    );

    const mockRouter = { push: vi.fn() };

    const wrapper = mount(RegisterBox, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("#register-username").setValue("testuser");
    await wrapper.find("#register-password").setValue("Valid123!");
    await wrapper.find("#register-form").trigger("submit.prevent");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/register",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "Valid123!",
        }),
      }),
    );
    expect(mockRouter.push).toHaveBeenCalledWith("/tasks");
  });

  it("handles registration error correctly", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    const wrapper = mount(RegisterBox, {
      global: {
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await wrapper.find("#register-username").setValue("testuser");
    await wrapper.find("#register-password").setValue("Valid123!");
    await wrapper.find("#register-form").trigger("submit.prevent");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/auth/register",
      expect.anything(),
    );
    expect(alertMock).toHaveBeenCalledWith(
      "Registration failed. Please try again.",
    );

    alertMock.mockRestore();
  });
});
