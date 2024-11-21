<template>
    <form id="login-form" @submit.prevent="submitLogin">
        <h2>Login</h2>
        <label for="login-username">Username</label>
        <input type="text" id="login-username" v-model="username" placeholder="Username" autocomplete="username" />

        <label for="login-password">Password</label>
        <input type="password" id="login-password" v-model="password" placeholder="Password"
            autocomplete="current-password" />

        <button id="login-btn" type="submit">Log In</button>
        <hr />
        <button id="create-new-account-btn" class="create-new-account-btn" @click.prevent="createNewAccount">
            Create new account
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        submitLogin() {
            // TODO: Handle login
        },
        createNewAccount() {
            // TODO: Handle  create new account
        },
    },
};
</script>
