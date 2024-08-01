<template>
  <main>
    <div class="nav">
      <router-link to="/discovery">Discovery</router-link>
      <router-link to="/restaurant_profile">Restaurant Profile</router-link>
      <router-link to="/orders">Orders</router-link>
      <a @click="logout">Logout</a>
    </div>
  </main>
</template>

<script>
export default {
  name: 'RestaurantHeader',
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
  grid-template-columns: repeat(4, 1fr);
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