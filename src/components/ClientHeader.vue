<template>
  <main>
    <div class="nav">
      <router-link to="/client_discovery">Discovery</router-link>
      <router-link to="/client_profile">Profile</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/client_orders">Orders</router-link> <!-- New Button -->
      <a @click="logout">Logout</a>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ClientHeader',
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.nav {
  background-color: #154168;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* Updated to accommodate new button */
}

.nav a {
  float: left;
  color: #f2f2f2f2;
  padding: 14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}

.nav a:hover {
  background-color: #ddd;
  color: #333;
}
</style>
