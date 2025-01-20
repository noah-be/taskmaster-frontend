import EditTaskBox from '@/components/EditTaskBox.vue';

describe('EditTaskBox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(EditTaskBox);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the dialog', () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);
  });

  it('should not render the dialog if currentTaskId is not set', async () => {
    const mockPiniaStore = wrapper.vm.$pinia._s.get('task');
    mockPiniaStore.currentTaskId = null;
    await wrapper.vm.$nextTick();
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.props('modelValue')).toBe(false);
  });
});
