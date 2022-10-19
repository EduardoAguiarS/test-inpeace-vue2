<template>
  <div id="app">
    <PageHeader />
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import PageHeader from '@/components/common/Header.vue';

export default {
  components: {
    PageHeader,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_normalizes.scss";
</style>
