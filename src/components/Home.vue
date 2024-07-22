<template>
  <main>
    <div class="container">
      <div class="hyperlinks">
        <router-link to="/restaurant_login" class="link">Restaurant Login here</router-link>
        <router-link to="/client_login" class="link">Customer Login here</router-link>
      </div>
    </div>
  </main>
</template>

<script>
</script>

<style scoped>
/* Resetting margin and padding for the body and html */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Full viewport height */
  background: #f0f0f0;
  /* Light gray background */
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.hyperlinks {
  display: flex;
  width: 100%;
  height: 100%;
}

.link {
  flex: 1;
  /* Takes up equal space */
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  /* White text */
  background-color: #007bff;
  /* Blue background */
  font-size: 1.5rem;
  /* Larger text */
  margin: 5px;
  /* Space between links */
  border-radius: 8px;
  /* Rounded corners */
  transition: background-color 0.3s;
  /* Smooth background color transition */
}

.link:hover {
  background-color: #0056b3;
  /* Darker blue on hover */
}

.link:active {
  background-color: #004085;
  /* Even darker blue when clicked */
}
</style>
