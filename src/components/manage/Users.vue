<template>
  <div class="manage__users">
    <h2 class="manage__users--title">Administrar usuários</h2>
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
    <span class="manage__users--qtd">mostrando {{ users.length }} de {{ total   }}</span>
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
    };
  },

  methods: {
    async getUsers() {
      try {
        const response = await axios.get('https://reqres.in/api/users');
        this.users = response.data.data;
        this.total = response.data.total;
      } catch (err) {
        console.log(err);
      }
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
}

</style>
