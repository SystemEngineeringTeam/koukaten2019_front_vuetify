import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import cookie from './cookie'


Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    cookie,
    render: h => h(App)
}).$mount('#app')
