import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import Store from './store';
import routes from './routes';
//import { Button, Select } from 'element-ui';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueResource);
//Vue.component(Button.name, Button)
//Vue.use(Select)

const router = new VueRouter({ routes });
const store = Store;


new Vue({
	el: '#app',
	store,
	router: router,
	render: h => h(App)
});
