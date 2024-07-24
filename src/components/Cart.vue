<template>
  <main>
    <h1>
      cart
    </h1>
    <li v-for="(item, i) in cart" :key="item.uuid">
      <img :src="item.image_url" :alt="item.name" />
      <h2>{{ item.name }}</h2>
      <p>{{ item.description }}</p>
      <p>{{ item.price | currency }}</p>
      <button @click="removeCartItem(i)">Remove from Cart</button>
    </li>
  </main>
</template>

<script>
import cookies from 'vue-cookies';
import { v4 as uuidv4 } from 'uuid'

export default {
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
    }
  }
};

</script>


<style scoped>
/* Add your styles here */
</style>
