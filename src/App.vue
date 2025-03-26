<script setup lang="ts"></script>

<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/"> Home</router-link>
      <router-link to="feedback">Feedback</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.header {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;

  .nav {
    display: flex;
    gap: 20px;

    a {
      text-decoration: none;
    }
  }
}

@media (min-width: 1024px) {
  .header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
