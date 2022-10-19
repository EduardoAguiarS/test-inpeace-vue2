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
          />
        </label>

        <label for="registerEmail">
          E-mail
          <input
            type="email"
            id="registerEmail"
            name="registerEmail"
            v-model="email"
          />
        </label>

        <label for="registerState">
          Estado
          <select
            id="registerState"
            name="registerState"
            v-model="state"
          >
            <option v-for="state in states" :value="state.sigla" :key="state.singla">
              {{ state.nome }}
            </option>
          </select>
        </label>

        <label for="registerGender">
          Sexo
          <label for="registerFemale">
            <input type="radio" name="gender" id="registerFemale" value="female" v-model="gender">
            Feminino
          </label>

          <label for="registerMale">
            <input type="radio" name="gender" id="registerMale" value="male" v-model="gender">
            Masculino
          </label>

          <label for="registerOther">
            <input type="radio" name="gender" id="registerOther" value="other" v-model="gender">
            Outro
          </label>
        </label>

        <label for="registerPassword">
          Senha
          <input
            type="password"
            id="registerPassword"
            name="registerPassword"
            v-model="password"
          />
          <span>A senha deve ter no mínimo 6 caracteres</span>
        </label>

        <label for="registerConfirmPassword">
          Confirmar Senha
          <input
            type="password"
            id="registerConfirmPassword"
            name="registerConfirmPassword"
            v-model="confirmPassword"
          />
        </label>
      </div>

      <div class="register__form--button">
        <button type="submit">Cadastrar</button>
      </div>
      <div class="register__form--login">
        <p>
          Já possui conta? <router-link to="/">Faça login aqui</router-link>
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

<style>

</style>
