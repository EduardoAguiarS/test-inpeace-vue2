<template>
  <div id="app">
    <PageHeader />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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

#app {
  overflow: hidden;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
</style>
