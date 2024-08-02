<template>
  <menu>
    <RestaurantHeader></RestaurantHeader>
    <div class="profile">
      <h1>Restaurant Profile</h1>
      <button @click="toggleEditMode">
        {{ isEditMode ? 'Save' : 'Edit' }}
      </button>
      <div v-if="isEditMode">
        <ul>
          <h2><input v-model="restaurant.name" placeholder="Edit Name"></h2>
          <p><input v-model="restaurant.bio" placeholder="Edit Bio"></p>
          <p><input v-model="restaurant.address" placeholder="Edit Address"></p>
          <p><input v-model="restaurant.city" placeholder="Edit City"></p>
          <p><input v-model="restaurant.email" placeholder="Edit Email"></p>
        </ul>
      </div>
      <div v-else>
        <ul>
          <h2>{{ restaurant.name }}</h2>
          <p>{{ restaurant.bio }}</p>
          <p>{{ restaurant.address }}</p>
          <p>{{ restaurant.city }}</p>
          <p>{{ restaurant.email }}</p>
        </ul>
      </div>
    </div>
    <div class="menu">
      <h2>Menu</h2>
      <ul class="menu-grid">
        <li v-for="item in menuItems" :key="item.id" class="menu-item">
          <img :src="item.image_url" :alt="item.name" />
          <div v-if="isEditMode">
            <h3><input v-model="item.name" placeholder="Edit Item Name"></h3>
            <p><input v-model="item.description" placeholder="Edit Item Description"></p>
            <p><input v-model="item.price" placeholder="Edit Item Price"></p>
            <button @click="() => saveMenuItem(item)">Save Item</button>
          </div>
          <div v-else>
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>{{ item.price }}</p>
          </div>
          <button @click="removeItem(item.id)">Remove</button>
        </li>
      </ul>
    </div>
  </menu>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
import RestaurantHeader from './RestaurantHeader.vue';

export default {
  components: {
    RestaurantHeader
  },
  data() {
    return {
      restaurant: {},
      menuItems: [],
      isEditMode: false,
    };
  },
  mounted() {
    this.fetchRestaurantProfile();
    this.fetchMenuItems();
  },
  methods: {
    fetchRestaurantProfile() {
      const restaurant_id = cookies.get("restaurant_id");
      axios.get(`http://209.38.6.175:5000/api/restaurant?restaurant_id=` + restaurant_id, {
        headers: {
          'x-api-key': 'NvZSG4',
          'token': `${cookies.get('token')}`
        },
      })
        .then(response => {
          this.restaurant = response.data[0];
        })
        .catch(error => {
          console.error("There was an error fetching the restaurant profile:", error);
        });
    },

    fetchMenuItems() {
      const restaurant_id = cookies.get("restaurant_id");
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

    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      if (!this.isEditMode) {
        this.saveRestaurantProfile(this.restaurant)
      }
    },

    saveRestaurantProfile(restaurant) {
      let data = JSON.stringify({
        email: restaurant.email,
        name: restaurant.name,
        address: restaurant.address,
        bio: restaurant.bio,
        city: restaurant.city,
        profile_url: restaurant.profile_url,
        banner_url: restaurant.banner_url,
        password: restaurant.password,
      });

      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'http://209.38.6.175:5000/api/restaurant',
        headers: {
          'x-api-key': 'NvZSG4',
          'token': `${cookies.get('token')}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveMenuItem(item) {
      let data = JSON.stringify({
        menu_id: item.id,
        description: item.description,
        image_url: item.image_url,
        name: item.name,
        price: item.price,
      });
      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'http://209.38.6.175:5000/api/menu',
        headers: {
          'x-api-key': 'NvZSG4',
          'token': `${cookies.get('token')}`,
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios.request(config)
        .then((response) => {
          if (response.status === 200) {
            this.fetchMenuItems();
            this.toggleEditMode();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    removeItem(id) {
      const index = this.menuItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = this.menuItems[index];
        let data = JSON.stringify({
          menu_id: item.id.toString()
        });

        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: 'http://209.38.6.175:5000/api/menu',
          headers: {
            'x-api-key': 'NvZSG4',
            'token': `${cookies.get('token')}`,
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
            if (response.status === 204) {
              this.fetchMenuItems();
            }
          })
          .catch((error) => {
            console.log(error);
          });

      } else {
        console.log('Item Not Found');
      }
    },
  }
};
</script>

<style scoped>
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  font-family: Arial, sans-serif;
}

.profile {
  display: grid;
  padding: 20px;
}

.profile p {
  font-size: 1.2rem;
}

.profile h1 {
  font-size: 2.5rem;
}

.profile input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
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
  color: #fff;
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

.menu-item input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

button {
  margin-top: 10px;
}
</style>
