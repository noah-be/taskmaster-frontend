import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import { createRouter, createWebHistory } from "vue-router";

const mockRoutes = [
  { path: "/", name: "home", component: { template: "<div>Home</div>" } },
  {
    path: "/about",
    name: "about",
    component: { template: "<div>About</div>" },
  },
  {
    path: "/contact",
    name: "contact",
    component: { template: "<div>Contact</div>" },
  },
];
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: mockRoutes,
});

describe("Navbar.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [mockRouter],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains the correct navigation links", async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [mockRouter],
      },
    });

    await mockRouter.isReady();

    const links = wrapper.findAll("a");
    expect(links).toHaveLength(3);
    expect(links[0].attributes("href")).toBe("/");
    expect(links[1].attributes("href")).toBe("/about");
    expect(links[2].attributes("href")).toBe("/contact");
  });
});
