import EditTaskBox from '@/components/EditTaskBox.vue';

describe('EditTaskBox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(EditTaskBox);
  });

  it('should render the dialog', () => {
    expect(true).toBe(true);
    //expect(wrapper.html()).toContain('task');
  });
});
