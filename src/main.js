import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import Product from './components/Product.vue';
import Home from './components/Home.vue';
import Store from './store';
//import { Button, Select } from 'element-ui';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueResource);
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
