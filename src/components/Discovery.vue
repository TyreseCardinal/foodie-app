<template>
  <main>
    <div>
      <Header></Header>
    </div>
    <h1>This is the discovery page</h1>
    <div class="restaurant-list">
      <router-link class="restaurant-card" v-for="restaurant in restaurants" :key="restaurant.restaurant_id"
        :to="'/menu/' + restaurant.restaurant_id">
        <h2>{{ restaurant.restaurant_id }}</h2>
        <h2>{{ restaurant.name }}</h2>
        <p>{{ restaurant.address }}</p>
        <p>{{ restaurant.phone_number }}</p>
        <p>{{ restaurant.bio }}</p>
        <p>{{ restaurant.city }}</p>
      </router-link>
    </div>
  </main>
</template>

<script>
import cookies from 'vue-cookies';
import axios from 'axios';
import Header from './Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      restaurants: []  // This is the data property to store the restaurant data
    };
  },
  created() {
    this.fetchRestaurants();  // Fetch restaurants when the component is created
  },
  methods: {
    async fetchRestaurants() {
      try {
        const response = await axios.get('http://209.38.6.175:5000/api/restaurants', {
          headers: {
            'x-api-key': 'NvZSG4',
            'Authorization': `Bearer ${cookies.get('token')}`  // Use the token from cookies
          }
        });
        console.log(response.data);  // Log the response data to inspect the structure
        this.restaurants = response.data;  // Store the response data in the restaurants array
      } catch (error) {
        console.log('Error fetching restaurants:', error);
      }
    }
  }
}
</script>

<style scoped>
.main {
  padding: 20px;
}

.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.restaurant-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
}

.restaurant-card h2 {
  margin-top: 0;
}

.restaurant-card p {
  margin: 0 0 10px;
}

.restaurant-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
