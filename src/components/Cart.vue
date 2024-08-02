<template>
  <main class="cart-container">
    <ClientHeader></ClientHeader>
    <h1 class="cart-title">Shopping Cart</h1>
    <ul class="cart-list">
      <li v-for="(item, i) in cart" :key="item.uuid" class="cart-item">
        <img :src="item.image_url" :alt="item.name" class="cart-item-img" />
        <div class="cart-item-details">
          <h2 class="cart-item-name">{{ item.name }}</h2>
          <p class="cart-item-description">{{ item.description }}</p>
          <p class="cart-item-price">{{ item.price }}</p>
          <button @click="removeCartItem(i)" class="remove-button">Remove from Cart</button>
        </div>
      </li>
    </ul>
    <button @click="placeOrder()" class="placeorder_button">Place Order</button>
  </main>
</template>

<script>
import cookies from 'vue-cookies';
import { v4 as uuidv4 } from 'uuid'
import ClientHeader from './ClientHeader.vue';

export default {
  components: {
    ClientHeader
  },
  data() {
    return {
      cart: [],
    };
  },
  mounted() {
    const cart = cookies.get("cart");
    if (cart) {
      this.cart = cart.map(item => {
        item.uuid = uuidv4();
        return item
      });
    }
  },
  methods: {
    removeCartItem(i) {
      if (this.cart.length === 1) {
        this.cart = []
      } else {
        this.cart.splice(i, 1);
      }
      cookies.set("cart", this.cart)
    },
    placeOrder() {

    }
  }
};
</script>

<style scoped>
.cart-container {
  background-color: #f4f4f4;
  /* Light gray background for the page */
  min-height: 100vh;
  /* Ensure it takes full height */
}

.cart-title {
  text-align: center;
  color: #154168;
  /* Header color */
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  /* White background for items */
  border: 1px solid #ddd;
  /* Light border for separation */
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Subtle shadow for depth */
}

.cart-item-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  margin: 0;
  font-size: 20px;
  color: #154168;
  /* Title color */
}

.cart-item-description {
  margin: 5px 0;
  color: #666;
  /* Description color */
}

.cart-item-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  /* Price color */
  margin: 5px 0;
}

.remove-button {
  background-color: #ff4d4d;
  /* Remove button background color */
  color: #fff;
  /* Button text color */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #e60000;
  /* Darker color on hover */
}
</style>
