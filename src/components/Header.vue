<template>
  <main>
    <div class="nav">
      <a href="#">Home</a>
      <a href="#">Edit Profile</a>
      <a href="#">Delete Profile</a>
      <a href="#"> </a>

    </div>
  </main>
</template>

<script>
export default {
  name: 'HeaderVue',
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