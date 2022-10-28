<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/logo.png" alt="logo" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style scoped lang="scss">
.header {
  display: block;
  background: $primary;

  padding: 1rem 0;

  position: fixed;
  z-index: 100;

  width: 100%;

  top: 0;
  left: 0;

  overflow: hidden;

  &__logo {
    display: block;
    margin: 0 auto;
    width: 12rem;
  }
}
</style>
