<template>
  <div class="manage__users">
    <h2 class="manage__users--title">Administrar usuários</h2>
    <div class="loading" v-if="loading">
      <div class="loading__container">
        <div class="loading__container--spinner"></div>
      </div>
    </div>
    <ul class="manage__users--list">
      <li v-for="user in users" :key="user.id">
        <img :src="user.avatar" alt="user avatar" class="avatar">
        <span class="name">{{ user.first_name + " " + user.last_name }}</span>
        <span class="email">{{ user.email }}</span>
        <div class="edit">
          <img src="../../assets/edit.png" alt="Edit Button">
        </div>
      </li>
    </ul>
    <div class="manage__users--others">
      <button class="logout__button" @click="logout">Sair</button>
      <span class="manage__users--qtd">mostrando {{ users.length }} de {{ total   }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageUsers',

  data() {
    return {
      users: [],
      total: 0,
      loading: false,
    };
  },

  methods: {
    async getUsers() {
      try {
        this.loading = true;
        setTimeout(async () => {
          const response = await axios.get('https://reqres.in/api/users?page=1');
          this.users = response.data.data;
          this.total = response.data.total;
          this.loading = false;
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },

    logout() {
      this.$router.push('/');
    },
  },

  created() {
    this.getUsers();
  },
};
</script>

<style scoped lang="scss">
.manage__users {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &--title {
    @include title-md;
  }

  &--list {
    display: flex;

    gap: 2rem;
    flex-wrap: wrap;

    li {
      background: $white;
      padding: 2rem;
      border: 6px;
      width: 390px;
      margin: 0 auto;

      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;

      flex-direction: column;
      gap: 1rem;

      position: relative;

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }

      .name {
        @include content-primary-lg;
      }

      .email {
        @include content-dark-md;
      }

      .edit {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 30px;
        height: 30px;

        cursor: pointer;
      }
    }
  }
  &--qtd {
    @include content-dark-md;
    text-align: end;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: $gray;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    &__container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

      &--spinner {
        width: 150px;
        height: 150px;
        border: 5px solid $gray;
        border-top: 5px solid $primary;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  .manage__users--others {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .logout__button {
      background: $primary;
      border: none;
      outline: none;
      padding: 1rem 1.2rem;
      border-radius: 6px;
      color: $white;
      cursor: pointer;

      font-size: 0.725rem;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
}

</style>
