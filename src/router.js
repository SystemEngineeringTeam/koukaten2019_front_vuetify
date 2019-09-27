import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';
import Home from './pages/Home';
import ClassSchedule from './pages/ClassSchedule';
import Config from './pages/Config';
import Questionnaire from './pages/Questionnaire';
import Questionnaire_Answer from './pages/Questionnaire_Answer';
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
      path: '/Config',
      name: 'Config',
      component: Config
    },
    {
      path: '/Questionnaire',
      name: 'Questionnaire',
      component: Questionnaire
    },
    {
      path: '/Questionnaire_Answer',
      name: 'Questionnaire_Answer',
      component: Questionnaire_Answer
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
