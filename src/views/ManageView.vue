<template>
  <div class="manage">
    <ManageUsers />
  </div>
</template>

<script>
import ManageUsers from '@/components/manage/Users.vue';

export default {
  name: 'RegisterView',
  components: {
    ManageUsers,
  },
};
</script>

<style lang="scss">
.manage {
  @include container;
  margin: 6rem auto 0 auto;
  padding-bottom: 2rem;
}
</style>
