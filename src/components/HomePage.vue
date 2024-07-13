<template>
  <div>
    <h1>
      Welcome to the home page
    </h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
    };
  },

  methods: {
    async RestaurantRegister() {
      try {
        const response = await axios.post('http://209.38.6.175:5000/api/restaurant', {
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
        })

        console.log('Restaurant Registered:', response)

      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
