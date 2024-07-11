<template>
  <main>
    <div class="register">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div>
          <label for="first_name">First Name:</label>
          <input type="text" v-model="first_name" required />
        </div>
        <div>
          <label for="last_name">Last Name:</label>
          <input type="text" v-model="last_name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <div>
          <label for="image_url">Profile Image URL:</label>
          <input type="url" v-model="image_url" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </main>
</template>

<script>
import cookies from "vue-cookies";
import axios from 'axios';

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      image_url: ''
    };
  },

  methods: {
    async signup() {
      try {
        const response = await axios.post('http://209.38.6.175:5000/api/client', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          username: this.username,
          password: this.password,
          image_url: this.image_url
        }, {
          headers: {
            'x-api-key': 'NvZSG4',
          }
        });

        console.log('User registered:', response);
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
.logo {
  width: 150px;
}

.register input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #154168;
}

.register button {
  width: 320px;
  height: 40px;
  border: 1px solid #154168;
  background-color: #154168;
  color: #fff;
  cursor: pointer;
}
</style>
