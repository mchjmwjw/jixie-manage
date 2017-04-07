import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import Product from './components/Product.vue';
import Home from './components/Home.vue';
import Store from './store/store';
//import { Button, Select } from 'element-ui';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
//Vue.component(Button.name, Button)
//Vue.use(Select)

const routes = [{
	path: '/', component: Home
}, {
	path: '/product', component: Product
}];
const router = new VueRouter({ routes });
const store = Store;


new Vue({
	el: '#app',
	store,
	router: router,
	render: h => h(App)
});
