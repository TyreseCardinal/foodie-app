import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import SignUp from './components/SignUp.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
