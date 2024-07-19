<template>
  <main>
    <div class="register-container">
      <h1>Restaurant Registration</h1>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="address" required />
        </div>
        <div class="form-group">
          <label for="phone_number">Phone Number:</label>
          <input type="tel" id="phone_number" v-model="phone_number" required />
        </div>
        <div class="form-group">
          <label for="bio">Bio:</label>
          <textarea id="bio" v-model="bio" required></textarea>
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" id="city" v-model="city" required />
        </div>
        <div class="form-group">
          <label for="profile_url">Profile URL:</label>
          <input type="url" id="profile_url" v-model="profile_url" required />
        </div>
        <div class="form-group">
          <label for="banner_url">Banner URL:</label>
          <input type="url" id="banner_url" v-model="banner_url" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    <div class="login-account">
      <h3>
        Already have an account? Login
        <router-link to="/restaurant_login"> here</router-link>
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
      name: '',
      address: '',
      phone_number: '',
      bio: '',
      city: '',
      profile_url: '',
      banner_url: '',
      password: ''
    };
  },

  methods: {
    async signup() {
      try {
        const response = await axios.post('http://209.38.6.175:5000/api/restaurant', {
          email: this.email,
          name: this.name,
          address: this.address,
          phone_number: this.phone_number,
          bio: this.bio,
          city: this.city,
          profile_url: this.profile_url,
          banner_url: this.banner_url,
          password: this.password
        }, {
          headers: {
            'x-api-key': 'NvZSG4',
          }
        });

        console.log('Restaurant registered:', response);
        if (response.status === 201) {
          cookies.set('token', response.data.token)
          this.$router.push('/')
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.register-container {
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
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}


.login-account {
  font-size: 1rem;
  text-align: center
}
</style>
