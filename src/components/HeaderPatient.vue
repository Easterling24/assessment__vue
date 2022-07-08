<template>
  <header>
    <div class="left__side">
      <div class="left__side--logo">
        <router-link to="/">
          <img src="../assets/codoc-logo.png" alt="codoc-logo" />
        </router-link>
      </div>

      <ul>
        <li><router-link to="/search">Recherche</router-link></li>
        <li><router-link to="#">Cohorte</router-link></li>
        <li><router-link to="#">Export</router-link></li>
        <li><router-link to="#">Admin</router-link></li>
      </ul>
    </div>

    <div class="right__side"></div>
  </header>

  <router-view />
</template>

<script>
export default {
  name: 'HeaderPatient',
}
</script>
<style lang="scss">
@import '../styles/header.scss';
</style>
