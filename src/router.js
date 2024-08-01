import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import RestaurantRegister from './components/RestaurantRegister.vue';
import RestaurantLogin from './components/RestaurantLogin.vue';
import RestaurantProfile from './components/RestaurantProfile.vue';
import RestaurantHeader from './components/RestaurantHeader.vue';
import ClientRegister from './components/ClientRegister.vue';
import ClientLogin from './components/ClientLogin.vue';
import ClientHeader from './components/ClientHeader.vue';
import Discovery from './components/Discovery.vue';
import Menu from './components/Menu.vue';
import Cart from './components/Cart.vue';
import EditMenu from './components/EditMenu.vue';

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
    path: '/client_header',
    name: 'ClientHeader',
    component: ClientHeader,
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: Discovery,
  },
  {
    path: '/menu/:restaurant_id',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/edit_menu',
    name: 'EditMenu',
    component: EditMenu,
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
