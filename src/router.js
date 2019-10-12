import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home';
import ClassSchedule from './pages/ClassSchedule';
import Initial_Registration from './pages/Initial_Registration';
import Login from './pages/Login';
import ClassScheduleView from './pages/ClassScheduleView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ClassSchedule',
      name: 'class_schedule',
      component: ClassSchedule,
      meta: { requiresAuth: true }
    },
    {
      path: '/Initial_Registration',
      name: 'Initial_Registration',
      component: Initial_Registration
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ClassScheduleView',
      name: 'class_scheduleview',
      component: ClassScheduleView,
      meta: { requiresAuth: true }
    }
  ]
});
