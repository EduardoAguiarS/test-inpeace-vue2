<template>
  <div class="register__form">
    <h3 class="register__form--title">Cadastro</h3>

    <!-- Register form -->
    <form @submit.prevent="register">
      <div class="register__form--fields">
        <label for="registerName">
          Nome Completo
          <input
            type="text"
            id="registerName"
            name="registerName"
            v-model="name"
            data-test="rName"
          />
        </label>

        <label for="registerEmail">
          E-mail
          <input
            type="email"
            id="registerEmail"
            name="registerEmail"
            v-model="email"
            data-test="rEmail"
          />
        </label>

        <label for="registerState">
          Estado
          <select
            id="registerState"
            name="registerState"
            v-model="state"
            data-test="rState"
          >
            <option v-for="state in states" :value="state.sigla" :key="state.singla">
              {{ state.nome }}
            </option>
          </select>
        </label>

        <label for="registerGender">
          Sexo

          <div class="register__form--gender">
            <label for="registerFemale" data-test="rFemale">
              <input type="radio" name="gender" id="registerFemale" value="female" v-model="gender">
              Feminino
            </label>

            <label for="registerMale" data-test="rMale">
              <input type="radio" name="gender" id="registerMale" value="male" v-model="gender">
              Masculino
            </label>

            <label for="registerOther" data-test="rOther">
              <input type="radio" name="gender" id="registerOther" value="other" v-model="gender">
              Outro
            </label>
          </div>
        </label>

        <label for="registerPassword">
          Senha
          <input
            type="password"
            id="registerPassword"
            name="registerPassword"
            v-model="password"
            data-test="rPassword"
          />
          <span class="register__form--rule">A senha deve ter no mínimo 6 caracteres</span>
        </label>

        <label for="registerConfirmPassword">
          Confirmar Senha
          <input
            type="password"
            id="registerConfirmPassword"
            name="registerConfirmPassword"
            v-model="confirmPassword"
            data-test="rConfirm"
          />
        </label>
      </div>

      <div class="register__form--button">
        <button type="submit" data-test="rSubmit">Cadastrar</button>
      </div>
      <div class="register__form--login">
        <p>
          Já possui conta? <router-link to="/">Entre aqui</router-link>
        </p>
      </div>
    </form>
    <div class="register__form--error" v-if="error"><span>{{ error }}</span></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',

  data() {
    return {
      states: [],
      name: '',
      email: '',
      state: '',
      gender: '',
      password: '',
      confirmPassword: '',
      users: [],
      error: '',
    };
  },

  methods: {
    // Get states from API using axios
    async getStates() {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        this.states = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    // Register user in localStorage
    register() {
      if (this.password !== this.confirmPassword || this.password.length < 6) {
        this.error = 'As senhas não conferem ou a senha é menor que 6 caracteres';
        return;
      }
      const userExists = this.users.find((user) => user.email === this.email);
      if (userExists) {
        this.error = 'Usuário já cadastrado';
        return;
      }

      this.users.push({
        nameComplete: this.name,
        email: this.email,
        state: this.state,
        gender: this.gender,
        password: this.password,
      });

      // Save users in localStorage
      localStorage.setItem('users', JSON.stringify(this.users));

      // Redirect to login page
      this.$router.push('/');
    },
  },

  watch: {
    password() {
      this.error = '';
    },
    confirmPassword() {
      this.error = '';
    },
    email() {
      this.error = '';
    },
  },

  created() {
    this.getStates();

    // Get users from localStorage
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  },
};

</script>

<style scoped lang="scss">
  .register__form {
    background: $white;
    padding: 2rem 3rem;
    border-radius: 6px;
    margin: 0 1rem 2rem 1rem;

    &--button {
      margin: 2.7rem auto 1.5rem auto;
      width: 50%;
      button {
        @include button($white, $primary);
      }
    }

    &--login {
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
      // Display fields in a grid 2 columns in desktop and 1 column in mobile
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      label {
        @include content-primary-md;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        input, select {
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
    &--gender {
      display: flex;
      gap: 0.5rem;
      label {
        display: flex;
        flex-direction: row;
      }
    }

    &--rule {
      @include content-gray-md;
      margin-top: 0.3rem;
      font-size: 0.725rem;
      color: $gray-dark;
    }

    &--error {
      margin-top: 1rem;
      text-align: center;
      span {
        @include content-danger-md;
      }
    }
  }
</style>
