<template>
  <div class="login">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/login/Form.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
