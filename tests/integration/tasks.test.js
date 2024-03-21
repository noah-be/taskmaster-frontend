import { toggleTask } from '../../public/js/tasks.js';

// Setup a mock for fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, task: { priority: 'high' } })
  })
);

// Setup jsdom environment
document.body.innerHTML = `
  <table id="todoTable">
    <tr></tr> <!-- Extra row for header or similar -->
    <tr>
      <td><input type="checkbox"></td>
    </tr>
  </table>
`;

test('toggleTask successfully toggles a task', done => {
  const checkbox = document.querySelector('input[type="checkbox"]');
  checkbox.checked = true;

  toggleTask(0);

  setTimeout(() => {
    try {
      expect(fetch).toHaveBeenCalled();
      expect(checkbox.checked).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  });
});
