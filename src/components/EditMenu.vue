<template>
  <div>
    <h1>Menu</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <img :src="item.image_url" :alt="item.name" />
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>{{ item.price }}</p>
        <p>{{ item.id }}</p>
        <!-- Remove line 10 once finished -->
        <button @click="remove()">Remove from Menu</button>
        <button>Edit Item</button>
      </li>
    </ul>
  </div>
</template>

<script>
import cookies from 'vue-cookies';
import axios from 'axios';


export default {
  data() {
    return {
      menuItems: [],
      restaurantToken: '',
    };
  },
  mounted() {
    this.fetchMenuItems();
    this.fetchRestaurantToken();
  },
  methods: {
    fetchMenuItems() {
      const restaurant_id = cookies.get("restaurant_id")
      console.log(restaurant_id)
      axios.get(`http://209.38.6.175:5000/api/menu?restaurant_id=` + restaurant_id, {
        headers: {
          'x-api-key': 'NvZSG4',
          'Authorization': `Bearer ${cookies.get('token')}`
        },
      })
        .then(response => {
          this.menuItems = response.data;
          console.log(this.menuItems);
        })
        .catch(error => {
          console.error("There was an error fetching the menu items:", error);
        });
    },
    fetchRestaurantToken() {
      const restaurantToken = cookies.get('token')
      console.log(restaurantToken)
    },
    remove(id) {
      console.log("Remove called");
      const index = this.menuItems.findindex((item) => item.id = id);
      console.log(index);
      this.items.splice(index, 1);
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
