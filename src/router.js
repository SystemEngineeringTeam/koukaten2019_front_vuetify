import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'
import ClassSchedule from './pages/ClassSchedule'

Vue.use(Router)

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
            component: ClassSchedule
        },
    ]
})