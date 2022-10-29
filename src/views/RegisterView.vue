<template>
  <div class="register">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/register/Form.vue';

export default {
  name: 'RegisterView',
  components: {
    RegisterForm,
  },
};
</script>

<style lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 7rem;
}
</style>
