<template>
  <main>
    <h1>
      Welcome to Add Page!
    </h1>
  </main>
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

<style scoped>
.hyperlinks {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  font-size: 1.5rem
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

main {
  max-width: 700px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
</style>