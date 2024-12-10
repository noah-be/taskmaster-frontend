import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

vi.mock("@/components/Navbar.vue", () => ({
  default: {
    template: "<nav></nav>",
  },
}));

describe("Header.vue", () => {
  it("renders correctly and matches snapshot", () => {
    const wrapper = mount(Header);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
