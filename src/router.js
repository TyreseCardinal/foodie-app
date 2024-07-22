import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import RestaurantRegister from './components/RestaurantRegister.vue';
import RestaurantLogin from './components/RestaurantLogin.vue';
import ClientRegister from './components/ClientRegister.vue';
import ClientLogin from './components/ClientLogin.vue';
import Header from './components/Header.vue'
import Discovery from './components/Discovery.vue'
import Menu from './components/Menu.vue'
import Update from './components/Update.vue'

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
    path: '/header',
    name: 'Header',
    component: Header,
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
    path: '/update',
    name: 'Update',
    component: Update,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
