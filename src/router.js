import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import RestaurantRegister from './components/RestaurantRegister.vue';
import RestaurantLogin from './components/RestaurantLogin.vue';
import RestaurantProfile from './components/RestaurantProfile.vue';
import RestaurantHeader from './components/RestaurantHeader.vue';
import RestaurantDiscovery from './components/RestaurantDiscovery.vue';
import ClientRegister from './components/ClientRegister.vue';
import ClientLogin from './components/ClientLogin.vue';
import ClientHeader from './components/ClientHeader.vue';
import ClientProfile from './components/ClientProfile.vue';
import ClientDiscovery from './components/ClientDiscovery.vue';
import Menu from './components/Menu.vue';
import Cart from './components/Cart.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/client_register',
    name: 'ClientRegister',
    component: ClientRegister,
  },
  {
    path: '/client_login',
    name: 'ClientLogin',
    component: ClientLogin,
  },
  {
    path: '/client_header',
    name: 'ClientHeader',
    component: ClientHeader,
  },
  {
    path: '/client_profile',
    name: 'ClientProfile',
    component: ClientProfile,
  },
  {
    path: '/client_discovery',
    name: 'ClientDiscovery',
    component: ClientDiscovery,
  },
  {
    path: '/restaurant_discovery',
    name: 'RestaurantDiscovery',
    component: RestaurantDiscovery,
  },
  {
    path: '/restaurant_register',
    name: 'RestaurantRegister',
    component: RestaurantRegister,
  },
  {
    path: '/restaurant_login',
    name: 'RestaurantLogin',
    component: RestaurantLogin,
  },
  {
    path: '/restaurant_profile',
    name: 'RestaurantProfile',
    component: RestaurantProfile,
  },
  {
    path: '/restaurant_header',
    name: 'RestaurantHeader',
    component: RestaurantHeader,
  },
  {
    path: '/menu/:restaurant_id',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
