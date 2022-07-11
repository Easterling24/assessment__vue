<template>
  <div class="greeting">
    <h1>
      Bienvenue sur mon test technique, je vous invite de proceder directement à
      la <router-link  to="/search"> recherche</router-link>
    </h1>
  </div>
</template>

<style lang="scss">
.greeting {
  margin: 20% auto;
  padding: 30px;
  width: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #686F78;
  font-size: 15px;
  text-align: center;
  border-radius: 8px;
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
