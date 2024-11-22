<template>
  <div
    id="registration-guidelines"
    :style="{ display: visible ? 'block' : 'none' }"
    :aria-hidden="!visible"
  >
    <h3>Registration Guidelines</h3>
    <ul>
      <li>
        <strong>Username:</strong>
        <ul>
          <li>Must be unique and not already in use</li>
          <li>At least 3 characters long</li>
        </ul>
      </li>
      <li>
        <strong>Password:</strong>
        <ul>
          <li>At least 8 characters long.</li>
          <li>Include a mix of upper and lower case letters</li>
          <li>
            Include at least one number and one special symbol (e.g., !, @, #)
          </li>
          <li>
            Avoid using easily guessable information like your name or birthday
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
