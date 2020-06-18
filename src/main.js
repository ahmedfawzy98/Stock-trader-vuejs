import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css';
import { routes } from './routes.js';
import store from './store/store.js'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://stock-trader-vuejs-e10e7.firebaseio.com/';

Vue.filter('currency', (value) =>{
    return '$' + value.toLocaleString();
})

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
