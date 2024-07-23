<template>
  <main>
    <h1>
      cart
    </h1>
    <div \v 0-if="cart.length">
      <div v-for="item in cart" :key="item.product.id" class="cart-item">
        <h2>{{ item.product.name }}</h2>
        <p>{{ item.product.price | currency }}</p>
        <p>Quantity: {{ item.quantity }} </p>
        <button @click="removeFromCart(item.product)">Remove</button>
      </div>
      <p>Total: {{ total | currency }}</p>
    </div>
    <p v-else>Your cart is empty.</p>
  </main>
</template>

<script>
import cookies from 'vue-cookies';

export default {
  data() {
    return {
      cart: [],
    }
  },
  methods: {

  },
  mounted: function () {
    console.log("mounted")
    const cart = cookies.get("cart")
    console.log(cart)
    this.cart = cart
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
