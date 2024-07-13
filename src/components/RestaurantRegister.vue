<template>
  <main>
    <div class="register">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" v-model="address" required />
        </div>
        <div>
          <label for="phone_number">Phone Number:</label>
          <input type="text" v-model="phone_number" required />
        </div>
        <div>
          <label for="bio">Bio:</label>
          <input type="text" v-model="bio" required />
        </div>
        <div>
          <label for="city">City:</label>
          <input type="text" v-model="city" required />
        </div>
        <div>
          <label for="profile_url">Profile URL:</label>
          <input type="url" v-model="profile_url" />
        </div>
        <div>
          <label for="banner_url">Banner URL:</label>
          <input type="url" v-model="banner_url" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </main>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";

export default {
  data() {
    return {
      email: "email@email.com",
      name: "",
      address: "",
      phone_number: "000-000-0000",
      bio: "",
      city: 'Calgary',
      profile_url: 'www.google.com',
      banner_url: 'www.google.com',
      password: 'password'
    };
  },

  methods: {
    async signup() {
      try {
        const response
        await axios.post('http://209.38.6.175:5000/api/restaurant'), {
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
        };

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
