<template>
  <main class="orders-container">
    <ClientHeader></ClientHeader>
    <h1 class="orders-title">My Orders</h1>
    <div class="filter">
      <label for="filter-confirmed">Show Confirmed</label>
      <input type="checkbox" id="filter-confirmed" v-model="filters.is_confirmed">

      <label for="filter-complete">Show Completed</label>
      <input type="checkbox" id="filter-complete" v-model="filters.is_complete">
    </div>
    <ul class="orders-list">
      <li v-for="order in groupedOrders" :key="order[0].order_id" class="order-item">
        <h2 class="order-name">Order #{{ order[0].order_id }}</h2>
        <div v-for="item in order" :key="item.menu_item_id" class="order-item-details">
          <img :src="item.image_url" :alt="item.name" class="order-item-img" />
          <div class="order-item-text">
            <h3 class="order-item-name">{{ item.name }}</h3>
            <p class="order-item-description">{{ item.description }}</p>
            <p class="order-item-price">{{ item.price }}</p>
          </div>
        </div>
        <p class="order-status">
          Status: {{ order[0].is_confirmed ? (order[0].is_complete ? 'Completed' : 'Confirmed') : 'Pending' }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
import ClientHeader from './ClientHeader.vue';

export default {
  components: {
    ClientHeader
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
  computed: {
    groupedOrders() {
      const grouped = this.orders.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {});
      return Object.values(grouped);
    }
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

      axios.get('http://209.38.6.175:5000/api/client-order', {
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

.order-item-details {
  display: flex;
  margin-bottom: 10px;
}

.order-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.order-item-text {
  flex: 1;
}

.order-item-name {
  margin: 0;
  font-size: 18px;
  color: #154168;
}

.order-item-description {
  margin: 5px 0;
  color: #666;
}

.order-item-price {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.order-status {
  color: #666;
}
</style>
