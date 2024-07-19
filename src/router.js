import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import RestaurantRegister from './components/RestaurantRegister.vue';
import RestaurantLogin from './components/RestaurantLogin.vue';
import ClientRegister from './components/ClientRegister.vue';
import ClientLogin from './components/ClientLogin.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: HomePage,
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
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
