import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe("Footer.vue", () => {
  it("renders correctly and matches snapshot", () => {
    const wrapper = mount(Footer);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
