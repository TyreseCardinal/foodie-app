<template>
  <div>
    <h1>Menu</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <img :src="item.image_url" :alt="item.name" />
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>{{ item.price | currency }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';

export default {
  data() {
    return {
      menuItems: []
    };
  },
  created() {
    this.fetchMenuItems();
  },
  methods: {
    fetchMenuItems() {
      const restaurantId = this.$route.params.restaurant_id;
      axios.get('http://209.38.6.175:5000/api/menu', {
        headers: {
          'x-api-key': 'NvZSG4',
          'Authorization': `Bearer ${cookies.get('token')}`
        },
        params: {
          restaurant_id: restaurantId
        }
      })
        .then(response => {
          this.menuItems = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the menu items:", error);
        });
    },
    addToCart(item) {
      // Implement the add to cart functionality here
      console.log("Item added to cart:", item);
    }
  },
  filters: {
    currency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
