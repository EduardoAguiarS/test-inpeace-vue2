<template>
  <div id="app">
    <PageHeader />
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
