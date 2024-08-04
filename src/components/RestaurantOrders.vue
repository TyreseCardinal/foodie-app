<template>
  <main class="orders-container">
    <RestaurantHeader></RestaurantHeader>
    <h1 class="orders-title">Restaurant Orders</h1>
    <div class="filter">
      <label for="filter-confirmed">Show Confirmed</label>
      <input type="checkbox" id="filter-confirmed" v-model="filters.is_confirmed">

      <label for="filter-complete">Show Completed</label>
      <input type="checkbox" id="filter-complete" v-model="filters.is_complete">
    </div>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order.order_id" class="order-item">
        <h2 class="order-name">{{ order.name }}</h2>
        <p class="order-price">{{ order.price }}</p>
        <p class="order-status">
          Status: {{ order.is_confirmed ? (order.is_complete ? 'Completed' : 'Confirmed') : 'Pending' }}
        </p>
        <button v-if="!order.is_confirmed" @click="confirmOrder(order.order_id)" class="confirm-button">Confirm
          Order</button>
        <button v-if="order.is_confirmed && !order.is_complete" @click="completeOrder(order.order_id)"
          class="complete-button">Complete Order</button>
      </li>
    </ul>
  </main>
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
      orders: [],
      filters: {
        is_confirmed: false,
        is_complete: false,
      },
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      const params = {
        is_confirmed: this.filters.is_confirmed ? 'true' : 'false',
        is_complete: this.filters.is_complete ? 'true' : 'false',
      };

      axios.get('http://209.38.6.175:5000/api/restaurant-order', {
        headers: {
          'x-api-key': 'NvZSG4',
          'token': `${cookies.get('token')}`
        },
        params: params,
      })
        .then(response => {
          this.orders = response.data;
          console.log("Orders fetched:", this.orders);
        })
        .catch(error => {
          console.error("There was an error fetching orders:", error);
        });
    },
    confirmOrder(order_id) {
      axios.patch('http://209.38.6.175:5000/api/restaurant-order', {
        order_id: order_id,
        is_confirmed: 'true',
      }, {
        headers: {
          'x-api-key': 'NvZSG4',
          'token': `${cookies.get('token')}`
        }
      })
        .then(() => {
          this.fetchOrders();
        })
        .catch(error => {
          console.error("There was an error confirming the order:", error);
        });
    },
    completeOrder(order_id) {
      axios.patch('http://209.38.6.175:5000/api/restaurant-order', {
        order_id: order_id,
        is_complete: 'true',
      }, {
        headers: {
          'x-api-key': 'NvZSG4',
          'token': `${cookies.get('token')}`
        }
      })
        .then(() => {
          this.fetchOrders();
        })
        .catch(error => {
          console.error("There was an error completing the order:", error);
        });
    },
  },
  watch: {
    filters: {
      handler() {
        this.fetchOrders();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.orders-container {
  background-color: #f4f4f4;
  min-height: 100vh;
}

.orders-title {
  text-align: center;
  color: #154168;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.filter {
  margin-bottom: 20px;
}

.filter label {
  margin-right: 10px;
}

.orders-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-name {
  margin: 0;
  font-size: 20px;
  color: #154168;
}

.order-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.order-status {
  color: #666;
}

.confirm-button {
  background-color: #4caf50;
  /* Green */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #45a049;
  /* Darker green */
}

.complete-button {
  background-color: #2196F3;
  /* Blue */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.complete-button:hover {
  background-color: #0b7dda;
  /* Darker blue */
}
</style>
