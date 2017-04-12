import Product from './views/Product.vue';
import Home from './views/Home.vue';

export default [
	{ 
		path: '/', 
		component: Home 
	}, { 
		path: '/product', 
		component: Product 
	}
];
