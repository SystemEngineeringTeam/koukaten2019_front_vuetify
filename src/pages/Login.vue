<template>
    <LoginForm></LoginForm>

</template>

<script>
    import LoginForm from "../components/LoginForm";
    export default {
        name: "Login",
        data() {
            return {
                show1: false
            }
        },
        components: {
            LoginForm,
        },

    }
</script>

<style scoped>

</style>