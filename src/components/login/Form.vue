<template>
  <div class="login__form">
    <h3 class="login__form--title">Acessar</h3>

    <!-- Login form -->
    <form @submit.prevent="login">
      <div class="login__form--fields">
        <label for="loginEmail">
          E-mail
          <input
            type="email"
            id="loginEmail"
            name="loginEmail"
            v-model="email"
          />
        </label>

        <label for="loginPassword">
          Senha
          <input
            type="password"
            id="loginPassword"
            name="loginPassword"
            v-model="password"
          />
        </label>
      </div>
      <div class="login__form--button">
        <button type="submit">Entrar</button>
      </div>
      <div class="login__form--register">
        <p>
          Não possui conta? <router-link to="/register">Cadastre-se aqui</router-link>
        </p>
      </div>
    </form>
    <div class="login__form--error" v-if="error"><span>{{ error }}</span></div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',

  data() {
    return {
      email: '',
      password: '',
      error: '',
      users: [],
    };
  },

  methods: {
    login() {
      // Check if user exists
      const user = this.users.find((u) => u.email === this.email);

      // If user exists, check if password is correct
      if (user && user.password === this.password) {
        this.$router.push('/register');
      } else {
        this.error = 'Usuário ou senha incorretos';
      }
    },
  },

  watch: {
    email() {
      this.error = '';
    },
    password() {
      this.error = '';
    },
  },

  created() {
    // Get users from localStorage
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  },
};
</script>

<style scoped lang="scss">
  .login__form {
    background: $white;
    padding: 2rem 3rem;
    border-radius: 6px;
    margin: 0 1rem;

    &--button {
      margin: 2.7rem 0 1.5rem 0;
      button {
        @include button($white, $primary);
      }
    }

    &--register {
      p {
        text-align: center;
        margin-top: 1rem;
        @include content-dark-md;

        a {
          @include content-primary-md;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    &--title {
      @include title-md;
      text-align: center;
      margin-bottom: 2rem;
    }

    &--fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label {
        @include content-primary-md;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        input {
          @include content-dark-md;
          padding: 0.5rem 1rem;
          border: 1px solid $primary;
          border-radius: 5px;

          &:focus {
            outline: 1px solid darken($primary, 10%);
          }
        }
      }
    }
  }
</style>
