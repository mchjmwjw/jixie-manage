import Product from './views/Product.vue';
import Home from './views/Home.vue';
import Treemg from './views/Treemg.vue';
import MaterialChart from './views/MaterialChart.vue';

export default [
	{ 
		path: '/', 
		component: Home 
	}, { 
		path: '/product', 
		component: Product 
	}, {
		path: '/treemg',
		component: Treemg
	}, {
		path: '/matchart',
		component: MaterialChart
	}
];
