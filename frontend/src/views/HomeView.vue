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
#login-btn {
  @extend %button-style;
  background-color: #595959;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #404040;
  }

  &:active {
    background-color: #202020;
  }
}

#create-new-account-btn {
  @extend %button-style;
  background-color: #0c2607;
  font-size: 18px;

  &:hover {
    background-color: #0f3d09;
  }

  &:active {
    background-color: #0a2f07;
  }
}

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
