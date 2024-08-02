<template>
  <div class="menu">
    <h1>Menu</h1>
    <ul class="menu-grid">
      <li v-for="item in menuItems" :key="item.id" class="menu-item">
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
      menuItems: [],
      shoppingCart: []
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
          console.log(this.menuItems);
        })
        .catch(error => {
          console.error("There was an error fetching the menu items:", error);
        });
    },
    addToCart(item) {
      this.shoppingCart.push(item)
      console.log("Item added to cart:", item);
      console.log("this shopping cart", this.shoppingCart);
      cookies.set("cart", this.shoppingCart)
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
