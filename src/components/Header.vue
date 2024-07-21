<template>
  <main>
    <div class="nav">
      <router-link to="/discovery">Discovery</router-link>
      <router-link to="/add">Add Profile</router-link>
      <router-link to="/update">Update Profile</router-link>
      <a @click="logout">Logout</a>

    </div>
  </main>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/restaurant_login')
    }
  }
}
</script>
<style scoped>
.nav {
  background-color: #154168;
  overflow: hidden;
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