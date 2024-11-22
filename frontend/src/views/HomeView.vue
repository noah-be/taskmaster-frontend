<script setup>
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <main>
    <div class="home">
      <LoginForm />

      <img
        id="todo-list-img"
        src="/images/todo_list.jpg"
        class="rounded-image"
        alt="A table on which there are plants, paper clips, a clipboard, an alarm clock and a ballpoint pen."
      />
    </div>
  </main>
</template>

<style lang="scss">
.blurred-background {
  filter: blur(5px);
  transition: filter 2s ease;
}

.register-box {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="password"] {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
  }

  .username-available {
    color: green;
  }

  .username-taken {
    color: red;
  }
}
</style>
