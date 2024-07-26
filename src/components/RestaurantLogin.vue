<template>
  <main>
    <div class="login-container">
      <h1>Restaurant Login</h1>
      <form @submit.prevent="restaurantlogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <div>
      <h3 class="create-account">
        Not registered? Create a restaurant account
        <router-link to="/restaurant_register"> here</router-link>
      </h3>
    </div>
  </main>
</template>

<script>
import cookies from 'vue-cookies';
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    async restaurantlogin() {
      try {
        const response = await axios.post('http://209.38.6.175:5000/api/restaurant-login', {
          email: this.email,
          password: this.password
        }, {
          headers: {
            'x-api-key': 'NvZSG4',
          }
        });

        console.log('Restaurant Login Successful:', response);
        if (response.status === 201) {
          cookies.set('token', response.data.token);
          cookies.set('restaurant_id', response.data.restaurant_id);
          this.$router.push('./restaurant_profile');
        }

      } catch (error) {
        console.log(error);
        alert('Login failed. Please check your credentials.');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #154168;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #10deec;
}

main {
  max-width: 600px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.create-account {
  font-size: 1rem;
  text-align: center
}
</style>
