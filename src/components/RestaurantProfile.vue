<template>
  <menu>
    <div class="profile">
      <h1>Restaurant Profile</h1>
      <ul v-for="restaurant in restaurantInformation" :key="restaurant.id">
        <h2>{{ restaurant.name }}</h2>
        <p>{{ restaurant.bio }}</p>
        <p>{{ restaurant.address }}</p>
        <p>{{ restaurant.city }}</p>
        <p>{{ restaurant.phone_number }}</p>
        <p>{{ restaurant.email }}</p>
      </ul>
    </div>
    <div class="menu">
      <h2>Menu</h2>
      <ul class="menu-grid">
        <li v-for="item in menuItems" :key="item.id" class="menu-item">
          <img :src="item.image_url" :alt="item.name" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>{{ item.price }}</p>
          <button @click="EditMenu(item)">Edit</button>
          <button @click="removeMenuItem(item.id)">Remove</button>
        </li>
      </ul>
    </div>
  </menu>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';

export default {
  data() {
    return {
      restaurantInformation: [],
      menuItems: [],
    };
  },
  mounted() {
    this.fetchRestaurantProfile();
    this.fetchMenuItems();
  },
  methods: {
    fetchRestaurantProfile() {
      const restaurant_id = cookies.get("restaurant_id")
      axios.get(`http://209.38.6.175:5000/api/restaurant?restaurant_id=` + restaurant_id, {
        headers: {
          'x-api-key': 'NvZSG4',
          'Authorization': `Bearer ${cookies.get('token')}`
        },
      })
        .then(response => {
          this.restaurantInformation = response.data;
          console.log(this.restaurantInformation);
        })
        .catch(error => {
          console.error("There was an error fetching the restaurant profile:", error);
        });
    },
    fetchMenuItems() {
      const restaurant_id = cookies.get("restaurant_id")
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
    }
  }
};
</script>

<style scoped>
.profile {
  display: grid;
}

.profile p {
  font-size: 1.2rem;
}

.profile h1 {
  font-size: 2.5rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  list-style-type: none;
  padding: 0;
}

.menu-item {
  background-color: #154168;
  /* Primary color */
  color: #fff;
  /* Secondary color */
  padding: 16px;
  text-align: center;
  border-radius: 8px;
}

.menu-item img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 16px;
}

.menu-item h3 {
  margin: 0 0 8px;
}

.menu-item p {
  margin: 0 0 8px;
}
</style>
